app.controller('UpdateDetailCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', '$q', 'UpdateDetailService', 'notify', 'obj', '$log', function ($scope, $http, $modal, $uibModalInstance, $q, UpdateDetailService, notify, obj, $log) {
    var vm = this;

    vm.radioCheck = 1;

    vm.obj = obj;

    vm.DatePicker = {
        open2: false,
    };
    
    vm.DatePicker.open = function($event,type) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.DatePicker[type] = true;

    };

    vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    vm.UpdateEntity = {
        Type: 1,
        Amount: 0,
        AmountDate: null,
        Note: "",
        ProjectId: vm.obj.projectId
    };

    vm.UpdateEntity2 = {
        Type: 2,
        AdvanceAmount: 0,
        AdvanceDate: null,
        Payment: 0,
        PaymentDate: null,
        ProjectId: vm.obj.projectId
    };

    fnInit();

    function fnInit() {
        if (obj.type !== 0) {
            UpdateDetailService.SearchPeriodDetail(obj.periodDetailId).then(function (data) {
                vm.UpdateEntity = data;
                vm.UpdateEntity2 = data;

                vm.radioCheck = data.Type;
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
            if (vm.radioCheck == 1) {
                UpdateDetailService.AddPeriodDetail(vm.UpdateEntity).then(function (data) {
                    $uibModalInstance.close(true);
                }, function (error) {
                    alert(error.message);
                });

            } else {
                UpdateDetailService.AddPeriodDetail(vm.UpdateEntity2).then(function (data) {
                    $uibModalInstance.close(true);
                }, function (error) {
                    alert(error.message);
                });
            }
        }
        else {
            if (vm.radioCheck == 1) {
                UpdateDetailService.UpdatePeriodDetail(vm.UpdateEntity).then(function (data) {
                    $uibModalInstance.close(true);
                }, function (error) {
                    alert(error.message);
                });

            } else {
                UpdateDetailService.UpdatePeriodDetail(vm.UpdateEntity2).then(function (data) {
                    $uibModalInstance.close(true);
                }, function (error) {
                    alert(error.message);
                });
            }
        }
    }

}]);