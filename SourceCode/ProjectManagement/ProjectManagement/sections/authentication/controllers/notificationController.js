'use strict';
app.controller('notificationController', ['$scope', 'localStorageService', 'authService', 'notify', '$uibModal', function ($scope, localStorageService, authService, notify, $uibModal) {

    $scope.fnLogOut = authService.logOut;
    var authData = localStorageService.get('authorizationData');
    if (authData) {
        $scope.UserName = authData.userFullName;
      
    }

    $scope.FnChangePassword = fnChangePassword;

    function fnChangePassword() {
        var modalInstance = $uibModal.open({
            templateUrl: 'sections/NV7000_System/NV7200_Users/NV7202_ChangePassword/view.html',
            controller: 'NV7202Ctrl',
            controllerAs: 'vmChangePassword',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV7000_System/NV7200_Users/NV7202_ChangePassword/controller.js',
                            'sections/NV7000_System/NV7200_Users/NV7202_ChangePassword/service.js'
                        ])
                    }
                ]
            }
        });
        modalInstance.result.then(function (rs) {
            if (rs)               
            {
                notify('Thay đổi mật khẩu thành công');
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    
}]);
