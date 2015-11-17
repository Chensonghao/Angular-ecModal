define(['angular', 'app', 'angular-ecModal'], function(angular) {
    angular.module('myModalDemo')
        .controller('containerCtrl', ['$ecModal', function($ecModal) {
            var vm = this;
            vm.showModal = function(effectId) {
                $ecModal.open({
                    templateUrl: 'modal-' + effectId,
                    controller: 'modal' + effectId,
                    controllerAs: 'md',
                    overlayClose: true,
                    resolve: {
                        title: function() {
                            return effectId;
                        }
                    }
                });
            }
        }])
        .controller('modal1', ['$ecModal', '$ecModalInstance', 'title','$scope', function($ecModal, $ecModalInstance, title,$scope) {
            //$scope.index=2;
            var vm = this;
            vm.title = title;
            vm.showModal = function() {
                $ecModal.open({
                    templateUrl: 'modal-more',
                    controller: 'modal3',
                    controllerAs: 'md',
                    overlayClose: true,
                    resolve: {
                        title: function() {
                            return "More";
                        }
                    }
                });
            }
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal1 closed.');
                });
            }
        }])
        .controller('modal2', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal2 closed.');
                });
            }
        }])
        .controller('modal3', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal3 closed.');
                });
            }
        }])
        .controller('modal4', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal4 closed.');
                });
            }
        }])
        .controller('modal5', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal5 closed.');
                });
            }
        }])
        .controller('modal6', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal6 closed.');
                });
            }
        }])
        .controller('modal7', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal7 closed.');
                });
            }
        }])
        .controller('modal8', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal8 closed.');
                });
            }
        }])
        .controller('modal9', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal9 closed.');
                });
            }
        }])
        .controller('modal10', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal10 closed.');
                });
            }
        }])
        .controller('modal11', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal11 closed.');
                });
            }
        }])
        .controller('modal12', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal12 closed.');
                });
            }
        }])
        .controller('modal13', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal13 closed.');
                });
            }
        }])
        .controller('modal14', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal14 closed.');
                });
            }
        }])
        .controller('modal15', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close().then(function() {
                    console.log('modal15 closed.');
                });
            }
        }]);
});
