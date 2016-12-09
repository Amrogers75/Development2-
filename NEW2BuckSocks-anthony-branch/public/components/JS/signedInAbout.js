(function () {
    angular.module('myApp')
        .component('signedInAbout', {
            templateUrl: 'components/HTML/signedInAbout.js',
            controller: homeController
        });


    function homeController() {
        console.log('Hi There');
    }
})();
