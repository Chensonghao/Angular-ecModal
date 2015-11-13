(function() {
    require.config({
        paths: {
            'angular': 'angular.min',
            'angular-route': "angular-route.min",
            'angular-ecModal': 'angular-ecModal',
            'app': 'app',
            'controller': 'controller'
        },
        shim: {
            'angular': {
                exports: "angular"
            },
            'angular-route': {
                deps: ["angular"],
                exports: "angular-route"
            },
            'angular-ecModal': {
                deps: ["angular"],
                exports: "angular-ecModal"
            }
        }
    });
    require(['angular', 'angular-route', 'angular-ecModal', 'app', 'controller'], function(angular) {
        angular.bootstrap(document, ["myModalDemo"]);
    });
})();

