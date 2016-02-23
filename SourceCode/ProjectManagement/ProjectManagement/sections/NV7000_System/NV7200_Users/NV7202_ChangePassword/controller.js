// Create Form Đơn đề nghị sửa chữa
//NV7202Ctrl
(function () {
    'use strict';

    angular.module('app').controller('NV7202Ctrl', NV7202Ctrl);

    NV7202Ctrl.$inject = ['$rootScope', '$scope', '$http', '$uibModal', '$uibModalInstance', 'NV7202Service', 'notify'];

    function NV7202Ctrl($rootScope, $scope, $http, $uibModal, $uibModalInstance, NV7202Service, notify) {
        var vm = this; // Declare view model
        var modalSelect = null;

        vm.LoadData = fnLoadData;

        vm.UserEntity = {
            OLDPASSWORD: null,
            NEWPASSWORD: null,
            CONFIRMNEWPASSWORD: null,
            USERNAME: null,
            USERID: null,
        };

        vm.FnChangePassword = fnChangePassword;
        vm.FnCloseModal = fnCloseModal;

        fnLoadData();

        function fnLoadData() {
            var user = NV7202Service.GetUser();
            vm.UserEntity.USERNAME = user.userName;
            vm.UserEntity.USERID = user.userid;
        }

        function fnChangePassword() {
            if (vm.UserEntity.CONFIRMNEWPASSWORD !== vm.UserEntity.NEWPASSWORD) {
                notify("Mật khẩu mới và mật khẩu nhắc lại không giống nhau");
                return;
            }

            NV7202Service.ChangePassword(vm.UserEntity).then(function (data) {                            
                $uibModalInstance.close(true);
            }, function (error) {
                notify(error.message);
            });
        }

        function fnCloseModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();