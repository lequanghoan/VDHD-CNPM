app.controller('ProfileCtrl', ['$scope', '$http', '$uibModal', 'ProfileService', 'items',
function ($scope, $http, $uibModal, ProfileService, items) {
    var vm = this;
    vm.ListYear = [];
    for (var i = 2010; i < 2051; i++) {
        vm.ListYear.push({ id: i, name: i });
    }
    vm.ProjectName = items.ProjectName;
    vm.ListProject = [];
    vm.SearchEntity = {
        PlanYear: 0,
        ProjectId: items.ProjectId,
    }
    initValue();
    vm.FnChangeYear = fnChangeYear;
    vm.FnSearch = fnSearch;
    vm.download = fnDownload;
    vm.FnCreate = fnShowModalCreate;
    vm.FnUpdate = fnShowModalUpdate;
    vm.FnDelete = fnShowConfirm;
    vm.FnClear = initValue;


    function initValue() {
        var d = new Date();
        var n = d.getFullYear();
        vm.SearchEntity.PlanYear = n;
        if (items.ProjectId == undefined)
            fnChangeYear();
        else {
            fnSearch();
        }
    }

    function fnDownload(profile) {
        //window.open('http://localhost:45807/api/fileUpload/1/Document.rtf', '_blank', '');'
        ProfileService.DownloadProfile(profile).then(function (data) {
            var file = new Blob([data], { type: undefined });
            saveAs(file, profile.FileName);
        }, function (error) {
            vm.ListData = null;
            fnShowMessage(error.message, 1);
        });
    }

    function fnSearch() {
        ProfileService.SearchProfile(vm.SearchEntity).then(function (data) {
            vm.ListData = data;
        }, function (error) {
            vm.ListData = null;
            fnShowMessage(error.message, 1);
        });

    }

    // Hàm load lại cb Dự án khi người dùng thay đổi năm kế hoạch
    function fnChangeYear() {
        ProfileService.GetAllProjectByYear(vm.SearchEntity).then(function (data) {
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
            templateUrl: 'sections/NV2000_Profile/NV2100_Create/view.html',
            controller: 'ProfileCreateCtrl',
            controllerAs: 'vmCreate',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV2000_Profile/NV2100_Create/controller.js',
                            'sections/NV2000_Profile/NV2100_Create/service.js'
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
            $log.info('Modal dismissed at: ' + new Date());
        });
    }


    function fnShowModalUpdate(profileId) {
        var modalInstance = $uibModal.open({
            templateUrl: 'sections/NV2000_Profile/NV2100_Edit/view.html',
            controller: 'ProfileUpdateCtrl',
            controllerAs: 'vmUpdate',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV2000_Profile/NV2100_Edit/controller.js',
                            'sections/NV2000_Profile/NV2100_Edit/service.js'
                        ]).then(
                            function () {
                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                            }
                        );
                    }
                ], items: function () {
                    return { ProfileId: profileId };
                }
            }
        });
        modalInstance.result.then(function (rs) {
            if (rs)
                fnSearch();
            else
                fnShowMessage("Cập nhật không thành công!", 1);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    function fnShowConfirm(profile) {
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
                fnDelete(profile);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    function fnDelete(profile) {
        ProfileService.DeleteProfile(profile).then(function (data) {
            fnSearch();
        }, function (error) {
            fnShowMessage(error.message, 1);
        });
    }
}]);
