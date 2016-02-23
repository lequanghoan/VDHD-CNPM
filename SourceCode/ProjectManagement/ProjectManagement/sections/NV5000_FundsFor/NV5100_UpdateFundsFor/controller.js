app.controller('UpdateMoneyCtrl', ['$scope', '$http', '$uibModal', '$q', 'FundsForUpdateService', 'notify', 'obj', '$log', function ($scope, $http, $modal, $q, FundsForUpdateService, notify, obj, $log) {
    var vm = this;

    vm.periods = [];
    vm.periodDetails = [];

    vm.searchCondition = {
        year: 0,
        ProjectId: "",
    };

    vm.searchPeriodDetail = {
        year: 0,
    };

    vm.options = {
        year: [],
        projects: []
    }

    vm.total = {
        Amount: 0,  //kinh phí thực hiện
        MoneyPaid: 0,   //đã giải ngân
        MoneyThink: 0,  //số dư dự toán
        MoneyAdd: 0,    //số dư ứng
        MoneyReturn: 0  //kinh phí trả lại
    }

    vm.periodTransfer = {
        AmountForward: 0,
        BalanceForward: 0,
        Year: 0,
        ProjectId: ""
    }

    //set value for option year
    vm.options.year = [{ value: 0, name: "Tất cả" }];
    for (var i = 2010; i < 2051; i++)
        vm.options.year.push({ value: i, name: i });

    //init page
    fnInitPage();

    vm.FnShowUpdate = fnShowUpdate;
    vm.FnShowUpdateDetail = fnShowUpdateDetail;
    vm.FnShowConfirm = fnShowConfirm;
    vm.FnSearchPeriod = fnSearchPeriod;
    vm.FnSearchPeriodDetail = fnSearchPeriodDetail;
    vm.FnGetComboboxProject = fnGetComboboxProject;
    vm.FnCalculateTotal = fnCalculateTotal;
    vm.FnUpdateTransfer = fnUpdateTransfer;


    function fnInitPage() {
        fnGetComboboxProject(vm.searchCondition.year);
    }

    //get data combobox project
    function fnGetComboboxProject(planYear) {
        FundsForUpdateService.GetComboboxProject(planYear).then(function (data) {
            vm.options.projects = data;
            vm.searchCondition.ProjectId = obj.projectId;
            fnSearchPeriod();
        }, function (error) {
            alert(error.message);
        });

    };

    //search Period
    function fnSearchPeriod() {
        FundsForUpdateService.SearchPeriod(vm.searchCondition.ProjectId).then(function (data) {
            vm.periods = data;
            fnCalculateTotal();
        }, function (error) {
            alert(error.message);
        });

    }

    //calculate total
    function fnCalculateTotal() {
        vm.total = {
            Amount: 0,
            MoneyPaid: 0,
            MoneyThink: 0,
            MoneyAdd: 0,
            MoneyReturn: 0
        };
        vm.total.Amount = obj.fundsfor;
        for (var i = 0; i < vm.periods.length; i++) {
            vm.total.MoneyPaid += vm.periods[i].MoneyPaid;
            vm.total.MoneyThink += vm.periods[i].Amount - vm.periods[i].MoneyGet;
            vm.total.MoneyAdd += vm.periods[i].MoneyAdd;
            vm.total.MoneyReturn += vm.periods[i].AmountReutrn;
        }
    }

    //search Period Detail
    function fnSearchPeriodDetail(projectId, year, index) {
        vm.SelectedRow = index;
        vm.searchPeriodDetail.year = year;
        FundsForUpdateService.SearchPeriodDetail(projectId, year).then(function (data) {
            vm.periodDetails = data;
        }, function (error) {
            alert(error.message);
        });

    }

    //show modal update
    function fnShowUpdate(type, periodId) {
        var modalInstance = $modal.open({
            templateUrl: 'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5101_CreateEditPeriod/view.html',
            controller: 'UpdateTimeCtrl',
            controllerAs: 'vmPopup',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5101_CreateEditPeriod/controller.js',
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5101_CreateEditPeriod/service.js'
                        ]);
                    }
                ], obj: function () {
                    return { type: type, periodId: periodId, projectId: vm.searchCondition.ProjectId };
                }
            }
        });

        modalInstance.result.then(function (rs) {
            if (rs) {
                fnSearchPeriod();
                notify('Cập nhật thành công!');
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //show modal update detail
    function fnShowUpdateDetail(type, periodDetailId) {
        var modalInstance = $modal.open({
            templateUrl: 'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5102_CreateEditDetail/view.html',
            controller: 'UpdateDetailCtrl',
            controllerAs: 'vmPopup',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5102_CreateEditDetail/controller.js',
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/NV5102_CreateEditDetail/service.js'
                        ]);
                    }
                ], obj: function () {
                    return { type: type, periodDetailId: periodDetailId, projectId: vm.searchCondition.ProjectId };
                }
            }
        });

        modalInstance.result.then(function (rs) {
            if (rs) {
                FundsForUpdateService.SearchPeriodDetail(vm.searchCondition.ProjectId, vm.searchPeriodDetail.year).then(function (data) {
                    vm.periodDetails = data;
                    fnSearchPeriod();
                }, function (error) {
                    alert(error.message);
                });
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //show modal confirm
    function fnShowConfirm(type, Id) {
        var modalInstance = $modal.open({
            templateUrl: 'sections/shared/modalConfirm/view.html',
            controller: 'ConfirmCtrl',
            controllerAs: 'vmPopup',
            resolve: {
                deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('sections/shared/modalConfirm/controller.js');
                                }
                ]
            }
        });

        //type = 0: delete period, type=1: delete periodDetail
        modalInstance.result.then(function (rs) {
            if (rs) {
                if (type === 0)
                    fnDeletePeriod(Id);
                else
                    fnDeletePeriodDetail(Id);
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function fnDeletePeriod(periodId) {
        FundsForUpdateService.DeletePeriod(periodId).then(function (data) {
            fnSearchPeriod();
        }, function (error) {
            alert(error.message);
        });
    }

    function fnDeletePeriodDetail(periodDetailId) {
        FundsForUpdateService.DeletePeriodDetail(periodDetailId).then(function (data) {
            fnSearchPeriod();
            FundsForUpdateService.SearchPeriodDetail(vm.searchCondition.ProjectId, vm.searchPeriodDetail.year).then(function (data) {
                vm.periodDetails = data;
            }, function (error) {
                alert(error.message);
            });
        }, function (error) {
            alert(error.message);
        });
    }

    function fnUpdateTransfer(amountForward, balanceForward, year, projectId) {
        vm.periodTransfer.AmountForward = amountForward;
        vm.periodTransfer.BalanceForward = balanceForward;
        vm.periodTransfer.Year = year;
        vm.periodTransfer.ProjectId = projectId;
        FundsForUpdateService.UpdatePeriodTransfer(vm.periodTransfer).then(function (data) {
            fnSearchPeriod();
        }, function (error) {
            alert(error.message);
        });

    }


    vm.ok = function () {
        $modalInstance.dismiss('cancel');
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);