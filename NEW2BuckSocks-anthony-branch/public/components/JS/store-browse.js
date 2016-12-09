(function () {
    angular.module('myApp')
        .component('storeBrowse', {
            templateUrl: 'components/HTML/store-browse.html',
            controller: storeBrowseController
        });


    function storeBrowseController( ngCart, $uibModal, $log, User, toaster, sockService) {
        ngCart.setTaxRate(2.69);
        ngCart.setShipping(4.99);

        var self = this;

        self.showCart = showCart;
        self.isNotVisible = false;
        self.isVisible = true;
        self.logOut = User.logout;
        self.pop = pop;
        self.removeToaster = removeToaster;
        self.Sizes = ["Small", "Medium", "Large"];
        // self.items = sockService.item;

        function pop () {
            toaster.pop('success', "You are signed out!");
        }
        
        function removeToaster () {
            ngCart.removeItemById(id);
        }

        function showCart() {
            self.isNotVisible = self.isNotVisible ? false : true;
            self.isVisible = self.isVisible ? false : true;
        }

        var $ctrl = this;

        $ctrl.animationsEnabled = true;

        $ctrl.open = function (item) {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                // size: size,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
        };

        $ctrl.items = {};

        var promise = sockService.getItems();
        promise.then(function(data) {
            $ctrl.items = data.data;
        });

        // $ctrl.openComponentModal = function () {
        //     var modalInstance = $uibModal.open({
        //         animation: $ctrl.animationsEnabled,
        //         component: 'modalComponent',
        //         resolve: {
        //             items: function () {
        //                 return $ctrl.items;
        //             }
        //         }
        //     });
        //
        //     modalInstance.result.then(function (selectedItem) {
        //         $ctrl.selected = selectedItem;
        //     }, function () {
        //         $log.info('modal-component dismissed at: ' + new Date());
        //     });
        // };


    }

    angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, item, toaster) {
        var $ctrl = this;
        $ctrl.item = item;
        
        $ctrl.pop = pop;

        function pop () {
            console.log("The pop function");
            toaster.pop('Failure', "I TOLD YOU NOT TO PRESS ME!");
        }
        
        // $ctrl.selected = {
        //     item: $ctrl.items[0]
        // };

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

    angular.module('myApp').component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function (toaster) {
            var $ctrl = this;



            $ctrl.$onInit = function () {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };

            $ctrl.toast = function () {
                console.log("The pop function");
                toaster.pop('success', "I TOLD YOU NOT TO PRESS ME!");
            };

            $ctrl.ok = function () {
                $ctrl.close({$value: $ctrl.selected.item});
            };

            $ctrl.cancel = function () {
                console.log("HI");
                $ctrl.dismiss({$value: 'cancel'});
                $ctrl.toast();
            };
        }
    });

})();