define(['angular', 'app', 'angular-ecModal'], function(angular) {
    angular.module('myModalDemo')
        .controller('containerCtrl', ['$ecModal', function($ecModal) {
            var vm = this;
            vm.showModal = function(effectId) {
                $ecModal.open({
                    templateUrl: 'modal-' + effectId,
                    controller: 'modal' + effectId,
                    controllerAs: 'md',
                    resolve: {
                        title: function() {
                            return effectId;
                        }
                    }
                });
            }
        }])
        .controller('modal1', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal2', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal3', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal4', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal5', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal6', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal7', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal8', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal9', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal10', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal11', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal12', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal13', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal14', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal15', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal16', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal17', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal18', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }])
        .controller('modal19', ['$ecModalInstance', 'title', function($ecModalInstance, title) {
            var vm = this;
            vm.title = title;
            vm.close = function() {
                $ecModalInstance.close(function() {
                    console.log('modal closed.');
                });
            }
        }]);

});
