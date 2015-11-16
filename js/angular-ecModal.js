angular.module('ecModal', [])
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
    .factory('$ecModalStack', ['$timeout', '$document', '$compile', '$rootScope', '$q', '$injector', '$$stackedMap',
        function($timeout, $document, $compile, $rootScope, $q, $injector, $$stackedMap) {
            var openedWindows = $$stackedMap.createNew();

            function removeModalWindow(modalInstance) {
                var modalWindow = openedWindows.get(modalInstance).value;
                openedWindows.remove(modalInstance);
                modalWindow.modalDomEl.remove();
                modalWindow.modalScope.$destroy();
            }
            var ecModalStack = {
                open: function(modalInstance, modal) {
                    var main = angular.element(document.querySelector('.md-main'));
                    if (!document.querySelector('.md-overlay')) {
                        main.append('<div class="md-overlay"></div>');
                    }
                    var overlay = angular.element(document.querySelector('.md-overlay'));
                    overlay.unbind('click')
                    if (modal.overlayClose) {
                        overlay.bind('click', function() {
                            ecModalStack.close(modalInstance);
                        });
                    }
                    openedWindows.add(modalInstance, {
                        deferred: modal.deferred,
                        modalScope: modal.scope
                    });

                    var angularDomEl = angular.element(modal.content);
                    var modalDomEl = $compile(angularDomEl)(modal.scope);
                    openedWindows.top().value.modalDomEl = modalDomEl;
                    main.prepend(modalDomEl);
                },
                close: function(modalInstance, result) {
                    var modalWindow = openedWindows.get(modalInstance);
                    if (modalWindow) {
                        modalWindow.value.modalScope.$$uibDestructionScheduled = true;
                        modalWindow.value.deferred.resolve(result);
                        removeModalWindow(modalInstance);
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
                                    var deferred=$q.defer();
                                    if($ecModalStack.close(modalInstance,result)){
                                        deferred.resolve(true);
                                    }else{
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
