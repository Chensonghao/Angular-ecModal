define(['angular', 'angular-route'], function(angular) {
    angular
        .module('myModalDemo', ['ngRoute','ecModal'])
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    /* @ngInject */
    function routeConfig($routeProvider) {
        $routeProvider.when('/demo', {
            templateUrl: 'view/demo.html',
            controller: 'containerCtrl',
            controllerAs: 'container'
        }).otherwise({
            redirectTo: '/demo'
        })
    }
});
