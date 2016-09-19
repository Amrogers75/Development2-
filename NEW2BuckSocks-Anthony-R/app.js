(function(){

    // this CREATES the myApp module (because it has the second, array parameter)
    angular.module('myApp',[
        'ngCart',
        'ui.router',
        'ngStorage', 
        'toaster',
        'firebase'
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<home-page></home-page>'
            })
            .state('store', {
                url: '/store',
                template: "<store-browse></store-browse>"
            })
            .state('login', {
                url: '/login',
                template: "<login-page></login-page>"
            });
    });
    
})();