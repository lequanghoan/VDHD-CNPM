app.controller('UpdateTimeCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$q', 'UpdateTimeService', 'notify', 'obj', '$log', function ($scope, $http, $modal, $uibModalInstance, $q, UpdateTimeService, notify, obj, $log) {
    var vm = this;

    vm.obj = obj;

    vm.UpdateEntity = {
        Year: null,
        Amount: null,
        AmountReutrn: null,
        ProjectId: obj.projectId,
    };

    fnInit();

    function fnInit() {
        if (obj.type !== 0) {
            UpdateTimeService.SearchPeriod(obj.periodId).then(function (data) {
                vm.UpdateEntity = data;
            }, function (error) {

            });
        }
    }


    vm.FnCancel = fnCloseModal;
    vm.FnSave = fnUpdatePeriod;

    function fnCloseModal() {
        $uibModalInstance.dismiss('cancel');
    }

    function fnUpdatePeriod() {
        if (obj.type === 0) {
            UpdateTimeService.AddPeriod(vm.UpdateEntity).then(function (data) {
                $uibModalInstance.close(true);
            }, function (error) {
                alert(error.message);
            });
        }
        else {
            UpdateTimeService.UpdatePeriod(vm.UpdateEntity).then(function (data) {
                $uibModalInstance.close(true);
            }, function (error) {
                alert(error.message);
            });
        }
    }

}]);