/**
 * Created by anthonyrogers on 7/11/16.
 */
(function () {

    angular.module('myApp', ['ui.router'])

    .config(myAppConfig);

    function myAppConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');
    }

})();



