app.controller('ProjectExpectedCtrl', ['$scope', '$http', '$uibModal', 'ExpectedProjectService', 'notify',
  function ($scope, $http, $uibModal, ExpectedProjectService, notify) {
      var vm = this;
      vm.ListYear = [];
      vm.ListData = [];
      vm.ListCategory = [];
      vm.GridVM = {
          TotalMoney: 0
      }
      fnGetDataCombobox();

      vm.ListDepartment = [];
      vm.SearchEntity = {
          ProjectName: "",
          ProjectType: "0",
          Status: "0",
          DepartmentId: "",
          PlanYear: "0"
      }
      vm.UpdateEntity = {
          ProjectId: null,
          Status: null,
          DepartmentId: null,
      }

      vm.FnClear = fnInitSearchValue;
      vm.FnSearch = fnSearch;
      vm.FnCreate = fnShowModalCreate;
      vm.FnShowEdit = fnShowModalEdit;
      vm.FnApproveProject = fnApproveProject;
      vm.FnChangeDept = fnChangeDept;
      vm.FnDelete = fnShowConfirm;
      function fnInitSearchValue() {
          vm.SearchEntity = {
              ProjectName: "",
              ProjectType: "0",
              Status: "0",
              DepartmentId: "",
              PlanYear: "0"
          }
      }

      function fnGetDataCombobox() {
          $http.get('data/list-year.json').success(function (data) {
              vm.ListYear = data;
          });
          ExpectedProjectService.GetAllDepartment().then(function (data) {
              vm.ListDepartment = data;
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnSearch() {
          vm.GridVM.TotalMoney = 0;
          ExpectedProjectService.SearchProject(vm.SearchEntity).then(function (data) {
              vm.ListData = data;
              for (var i = 0; i < vm.ListData.length; ++i) {
                  vm.GridVM.TotalMoney += vm.ListData[i].FundsFor;
              }
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });

      }

      function fnApproveProject(projectId, status) {
          vm.UpdateEntity = {
              ProjectId: projectId,
              Status: status,
              DepartmentId: null
          }
          ExpectedProjectService.ApproveProject(vm.UpdateEntity).then(function (data) {
              notify('Cập nhật thành công!');
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });

      }

      function fnChangeDept(projectId, deptId) {
          vm.UpdateEntity = {
              ProjectId: projectId,
              Status: null,
              DepartmentId: deptId
          }
          ExpectedProjectService.ChangeDept(vm.UpdateEntity).then(function (data) {
              notify('Cập nhật thành công!');
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });

      }

      function fnShowConfirm(projectId) {
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
                  fnDelete(projectId);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
      function fnDelete(deptId) {
          ExpectedProjectService.DeleteProject(deptId).then(function (data) {
              fnSearch();
          }, function (error) {
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowModalCreate() {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Create/view.html',
              controller: 'ProjectExpectedCreateCtrl',
              controllerAs: 'vmCreate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Create/controller.js',
                              'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Create/service.js'
                          ]).then(
                              function () {
                                  return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                              }
                          );
                      }
                  ]
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

      function fnShowModalEdit(projecId) {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Edit/view.html',
              controller: 'ProjectExpectedUpdateCtrl',
              controllerAs: 'vmUpdate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Edit/controller.js',
                              'sections/NV1000_Project/NV1100_ProjectExpected/NV1101_Edit/service.js'
                          ]).then(
                              function () {
                                  return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                              }
                          );
                      }
                  ], items: function () {
                      return { ProjectId: projecId };
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
  }
]);
