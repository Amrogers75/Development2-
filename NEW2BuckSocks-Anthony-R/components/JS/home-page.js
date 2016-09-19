(function () {
    angular.module('myApp')
        .component('homePage', {
            templateUrl: 'components/HTML/home-page.html',
            controller: homeController
        });


    function homeController() {
        console.log('Hi There');
    }
})();

