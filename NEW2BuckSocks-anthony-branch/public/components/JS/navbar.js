(function () {
    angular.module('myApp')
        .component('navbar', {
            templateUrl: 'components/HTML/navbar.html',
            controller: navController
        });


    function navController(User, $timeout, $state) {
        var vm = this;
        vm.showLogin = false;
        vm.email = undefined;
        vm.password = undefined;
        vm.displayName = User.getDisplayName();
        vm.close = close;

        vm.showEmailLogin = showEmailLogin;
        vm.login = login;
        vm.loginWithEmail = loginWithEmail;
        vm.logout = logout;

        function showEmailLogin() {
            vm.showLogin = !vm.showLogin;
        }

        function loginWithEmail() {
            User.loginWithEmail(vm.email, vm.password)
                .then(function () {
                    $timeout(function () {
                        vm.displayName = User.getDisplayName();
                        vm.showLogin = false;
                        vm.password = undefined;
                        $state.go('store')
                    });

                });
        }

        function login(provider) {
            User.login(provider)
                .then(function () {
                    $timeout(function () {
                        vm.displayName = User.getDisplayName();
                        vm.showLogin = false;
                        $state.go('store')
                    });

                }, function (data) {
                    console.error (data)
                });
        }

        // function logout() {
        //     console.log('logout nav');
        //     User.logout();
        //     vm.displayName = undefined;
        //     $state.go('home', {}, {reload: true});
        // }
        function logout() {
            User.logout();
            vm.displayName = undefined;
        }
    }
})();
