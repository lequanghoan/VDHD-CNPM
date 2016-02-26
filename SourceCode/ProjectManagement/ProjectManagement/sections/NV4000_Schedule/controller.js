app.controller('ScheduleCtrl', ['$scope', '$http', '$uibModal', 'ScheduleService', 'items',
function ($scope, $http, $uibModal, ScheduleService, items) {
    var vm = this;
    vm.ListYear = [];
    for (var i = 2010; i < 2051; i++) {
        vm.ListYear.push({ id: i, name: i });
    }
    vm.ProjectName = items.projectName;
    vm.ListProject = [];
    vm.SearchEntity = {
        PlanYear: 0,
        ProjectId: items.projectId,
    }
    initValue();
    vm.FnChangeYear = fnChangeYear;
    vm.FnSearch = fnSearch;
    vm.FnCreate = fnShowModalCreate;
    vm.FnUpdate = fnShowModalUpdate;
    vm.FnDelete = fnShowConfirm;
    vm.FnClear = initValue;
    vm.Convert = fnConvertToTimes;
    vm.Cancel = fnCloseModal;
    function fnCloseModal() {
        $uibModalInstance.dismiss('cancel');
    }
    function initValue() {
        var d = new Date();
        var n = d.getFullYear();
        vm.SearchEntity.PlanYear = n;
        // Trường hợp không phải là popup thì search
        if (items.projectId == undefined)
            fnChangeYear();
        else {
            fnSearch();
        }
    }



    function fnConvertToTimes(mf, yf, mt, yt) {
        // Trường hợp tháng <10 thì thêm 0 phía trước
        mf = (mf < 10) ? "0" + mf : mf;
        mt = (mt < 10) ? "0" + mt : mt;
        return mf + "/" + yf + " - " + mt + "/" + yt;
    }

    function fnSearch() {
        ScheduleService.SearchSchedule(vm.SearchEntity).then(function (data) {
            vm.ListData = data;
        }, function (error) {
            vm.ListData = null;
            fnShowMessage(error.message, 1);
        });

    }

    // Hàm load lại cb Dự án khi người dùng thay đổi năm kế hoạch
    function fnChangeYear() {
        ScheduleService.GetAllProjectByYear(vm.SearchEntity).then(function (data) {
            vm.ListProject = data;
            if (vm.ListProject.length > 0) {
                vm.SearchEntity.ProjectId = vm.ListProject[0].ProjectId;
                fnSearch();
            }
        }, function (error) {
            vm.ListData = null;
            fnShowMessage(error.message, 1);
        });
    }

    function fnShowModalCreate() {
        var modalInstance = $uibModal.open({
            templateUrl: 'sections/NV4000_Schedule/NV4000_Create/view.html',
            controller: 'ScheduleCreateCtrl',
            controllerAs: 'vmCreate',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV4000_Schedule/NV4000_Create/controller.js',
                            'sections/NV4000_Schedule/NV4000_Create/service.js'
                        ]).then(
                            function () {
                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                            }
                        );
                    }
                ], items: function () {
                    return { ProjectId: vm.SearchEntity.ProjectId };
                }
            }
        });
        modalInstance.result.then(function (rs) {
            if (rs)
                fnSearch();
            else
                fnShowMessage("Thêm mới không thành công!", 1);
        }, function () {
        });
    }

    function fnShowModalUpdate(scheduleId) {
        var modalInstance = $uibModal.open({
            templateUrl: 'sections/NV4000_Schedule/NV4000_Edit/view.html',
            controller: 'ScheduleUpdateCtrl',
            controllerAs: 'vmUpdate',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV4000_Schedule/NV4000_Edit/controller.js',
                            'sections/NV4000_Schedule/NV4000_Edit/service.js'
                        ]).then(
                            function () {
                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                            }
                        );
                    }
                ], items: function () {
                    return { ScheduleId: scheduleId };
                }
            }
        });
        modalInstance.result.then(function (rs) {
            if (rs)
                fnSearch();
            else
                fnShowMessage("Cập nhật không thành công!", 1);
        }, function () {
        });
    }

    function fnShowConfirm(ScheduleId) {
        var modalInstance = $uibModal.open({
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
        modalInstance.result.then(function (rs) {
            if (rs)
                fnDelete(ScheduleId);
        }, function () {
        });
    };
    function fnDelete(ScheduleId) {
        ScheduleService.DeleteSchedule(ScheduleId).then(function (data) {
            fnSearch();
        }, function (error) {
            fnShowMessage(error.message, 1);
        });
    }
}]);


