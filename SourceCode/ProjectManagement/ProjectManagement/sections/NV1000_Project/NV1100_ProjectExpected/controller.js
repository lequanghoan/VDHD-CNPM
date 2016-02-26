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
              PlanYear: new Date().getFullYear()
          }
          fnSearch();
      }

      function fnGetDataCombobox() {
          vm.ListYear = [{ id: 0, name: "Tất cả" }];
          for (var i = 2010; i < 2051; i++)
              vm.ListYear.push({ id: i, name: i });
          ExpectedProjectService.GetAllDepartment().then(function (data) {
              vm.ListDepartment = data;
              fnInitSearchValue();
          }, function (error) {
              notify('Lỗi xảy ra khi lấy danh sách phòng ban!');
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
              notify('Lỗi xảy ra khi lấy danh sách nhiệm vụ!');
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
              notify('Cập nhật không thành công!');
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
              notify('Cập nhật không thành công!');
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
              if (rs) {
                  ExpectedProjectService.CheckConstrain(projectId).then(function (data) {
                      if (data)
                          fnShowConfirm2(projectId);
                      else {
                          fnDelete(projectId);
                      }
                  }, function (error) {
                      notify('Lỗi xảy ra khi kết nối server');
                  });
              }
          }, function () {
          });
      };


      function fnShowConfirm2(projectId) {
          var modalConfirm = $uibModal.open({
              templateUrl: 'sections/shared/modalConfirmWithTitle/view.html',
              controller: 'ConfirmOverwriteCtrl',
              controllerAs: 'vmPopup',
              resolve: {
                  deps: ['uiLoad',
                                  function (uiLoad) {
                                      return uiLoad.load('sections/shared/modalConfirmWithTitle/controller.js');
                                  }
                  ], items: function () {
                      return { Title: "Nhiệm vụ đang được thực hiện bạn có muốn xóa không?" };
                  }
              }
          });
          modalConfirm.result.then(function (rs) {
              if (rs)
                  fnDelete(projectId);
          }, function () {
          });
      }

      function fnDelete(projectId) {
          ExpectedProjectService.DeleteProject(projectId).then(function (data) {
              fnSearch();
          }, function (error) {
              notify('Lỗi khi xóa nhiệm vụ!');
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
          }, function () {
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
          }, function () {             
          });
      }
  }
]);
