angular.module('ecModal', [])
    .directive('overlay', ['$ecModalStack', function($ecModalStack) {
        return {
            restrict: 'A',
            replace: true,
            template: '<div class="md-overlay" ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"></div>',
            link: function(scope, element, attrs) {
                scope.close = function(evt) {
                    var modal = $ecModalStack.getTop();
                    if (modal && (evt.target === evt.currentTarget)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        if (modal.value.overlayClose) {
                            scope.$apply(function() {
                                $ecModalStack.close(modal.key);
                            });
                        }
                    }
                };
                element.on('click', scope.close);
            }
        }
    }])
    .factory('$$stackedMap', function() {
        return {
            createNew: function() {
                var stack = [];

                return {
                    add: function(key, value) {
                        stack.push({
                            key: key,
                            value: value
                        });
                    },
                    get: function(key) {
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                return stack[i];
                            }
                        }
                    },
                    keys: function() {
                        var keys = [];
                        for (var i = 0; i < stack.length; i++) {
                            keys.push(stack[i].key);
                        }
                        return keys;
                    },
                    top: function() {
                        return stack[stack.length - 1];
                    },
                    remove: function(key) {
                        var idx = -1;
                        for (var i = 0; i < stack.length; i++) {
                            if (key == stack[i].key) {
                                idx = i;
                                break;
                            }
                        }
                        return stack.splice(idx, 1)[0];
                    },
                    removeTop: function() {
                        return stack.splice(stack.length - 1, 1)[0];
                    },
                    length: function() {
                        return stack.length;
                    }
                };
            }
        };
    })
    .factory('$ecModalStack', ['$document', '$compile', '$rootScope', '$q', '$injector', '$$stackedMap',
        function($document, $compile, $rootScope, $q, $injector, $$stackedMap) {
            var openedWindows = $$stackedMap.createNew();
            var backdropDomEl, backdropScope;

            $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
                if (backdropScope) {
                    backdropScope.index = newBackdropIndex;
                }
            });

            function removeModalWindow(modalInstance, elementToReceiveFocus) {
                var modalWindow = openedWindows.get(modalInstance).value;
                openedWindows.remove(modalInstance);
                modalWindow.modalDomEl.remove();
                var currBackdropIndex = backdropIndex();
                if (currBackdropIndex == 0) {
                    backdropDomEl.remove();
                    backdropDomEl = undefined;
                    backdropScope.$destroy();
                    backdropScope = undefined;
                }
                modalWindow.modalScope.$destroy();

                if (elementToReceiveFocus && elementToReceiveFocus.focus) {
                    elementToReceiveFocus.focus();
                }
            }

            function backdropIndex() {
                var opened = openedWindows.keys();
                return opened.length;
            }
            var ecModalStack = {
                getTop: function() {
                    return openedWindows.top();
                },
                open: function(modalInstance, modal) {
                    var modalOpener = $document[0].activeElement
                    openedWindows.add(modalInstance, {
                        deferred: modal.deferred,
                        overlayClose: modal.overlayClose,
                        modalScope: modal.scope
                    });

                    var body = $document.find('body').eq(0),
                        currBackdropIndex = backdropIndex();
                    if (currBackdropIndex > 0 && !backdropDomEl) {
                        //遮蔽层scope
                        backdropScope = $rootScope.$new(true);
                        //遮蔽层index
                        backdropScope.index = currBackdropIndex;
                        var angularBackgroundDomEl = angular.element('<div overlay></div>');
                        backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
                        body.append(angularBackgroundDomEl);
                    }

                    var angularDomEl = angular.element(modal.content);

                    angularDomEl.css({
                        'z-index': 1050 + backdropIndex() * 10
                    });
                    var modalDomEl = $compile(angularDomEl)(modal.scope);
                    openedWindows.top().value.modalDomEl = modalDomEl;
                    openedWindows.top().value.modalOpener = modalOpener;
                    body.append(modalDomEl);
                },
                close: function(modalInstance, result) {
                    var modalWindow = openedWindows.get(modalInstance);
                    if (modalWindow) {
                        modalWindow.value.modalScope.$$uibDestructionScheduled = true;
                        modalWindow.value.deferred.resolve(result);
                        removeModalWindow(modalInstance, modalWindow.value.modalOpener);
                        return true;
                    }
                    return !modalWindow;
                }
            }
            return ecModalStack;
        }
    ])
    .provider('$ecModal', function() {
        var $modalProvider = {
            options: {
                template: null,
                templateUrl: null,
                controller: '',
                controllerAs: '',
                overlayClose: false,
                resolve: {}
            },
            $get: ['$injector', '$rootScope', '$templateRequest', '$controller', '$q', '$ecModalStack',
                function($injector, $rootScope, $templateRequest, $controller, $q, $ecModalStack) {
                    return {
                        open: function(modalOptions) {
                            var modalResultDeferred = $q.defer(),
                                modalOpenedDeferred = $q.defer();
                            var modalInstance = {
                                result: modalResultDeferred.promise,
                                opened: modalOpenedDeferred.promise,
                                close: function(result) {
                                    var deferred = $q.defer();
                                    if ($ecModalStack.close(modalInstance, result)) {
                                        deferred.resolve(true);
                                    } else {
                                        deferred.reject('close failed.')
                                    }
                                    return deferred.promise;
                                }
                            };
                            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                            modalOptions.resolve = modalOptions.resolve || {};

                            //verify options
                            if (!modalOptions.template && !modalOptions.templateUrl) {
                                throw new Error('One of template or templateUrl options is required.');
                            }

                            function getTemplatePromise(options) {
                                return options.template ? $q.when(options.template) :
                                    $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
                            }

                            function getResolvePromises(resolves) {
                                var promisesArr = [];
                                angular.forEach(resolves, function(value) {
                                    if (angular.isFunction(value) || angular.isArray(value)) {
                                        promisesArr.push($q.when($injector.invoke(value)));
                                    } else if (angular.isString(value)) {
                                        promisesArr.push($q.when($injector.get(value)));
                                    } else {
                                        promisesArr.push($q.when(value));
                                    }
                                });
                                return promisesArr;
                            }
                            var templateAndResolvePromise =
                                $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

                            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {
                                var modalScope = (modalOptions.scope || $rootScope).$new();
                                modalScope.$close = modalInstance.close;
                                modalScope.$on('$destroy', function() {
                                    if (!modalScope.$$uibDestructionScheduled) {
                                        modalScope.$close();
                                    }
                                });

                                var ctrlInstance, ctrlLocals = {};
                                var resolveIter = 1;

                                //controllers
                                if (modalOptions.controller) {
                                    ctrlLocals.$scope = modalScope;
                                    ctrlLocals.$ecModalInstance = modalInstance;
                                    angular.forEach(modalOptions.resolve, function(value, key) {
                                        ctrlLocals[key] = tplAndVars[resolveIter++];
                                    });

                                    ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                                    if (modalOptions.controllerAs) {
                                        if (modalOptions.bindToController) {
                                            angular.extend(ctrlInstance, modalScope);
                                        }

                                        modalScope[modalOptions.controllerAs] = ctrlInstance;
                                    }
                                }
                                $ecModalStack.open(modalInstance, {
                                    scope: modalScope,
                                    deferred: modalResultDeferred,
                                    content: tplAndVars[0],
                                    overlayClose: modalOptions.overlayClose
                                });
                                modalOpenedDeferred.resolve(true);

                            }, function resolveError(reason) {
                                modalOpenedDeferred.reject(reason);
                                modalResultDeferred.reject(reason);
                            });

                            return modalInstance;
                        }
                    }
                }
            ]
        }
        return $modalProvider;
    });
