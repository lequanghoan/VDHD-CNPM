app.controller('CareerUpdateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'items', 'CareerUpdateService',
function ($scope, $http, $uibModal, $uibModalInstance, items, CareerUpdateService) {
    var vm = this;
    vm.UpdateEntity = {
        CareerName: "",
        Note: ""
    }
    fnGetCareerById(items);

    vm.FnCancel = fnCloseModal;
    vm.FnSave = fnUpdateCareer;
    function fnCloseModal() {
        $uibModalInstance.dismiss('cancel');
    }
    function fnUpdateCareer() {
        CareerUpdateService.UpdateCareer(vm.UpdateEntity).then(function (data) {
            $uibModalInstance.close(true);
        }, function (error) {
        });

    }
    function fnGetCareerById(obj) {
        CareerUpdateService.GetCareerById(obj).then(function (data) {
            vm.UpdateEntity = data;
        }, function (error) {

        });
    }
}
]);