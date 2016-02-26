app.controller('DepartmentCtrl', ['$scope', '$http', '$uibModal', 'DeptService',
  function ($scope, $http, $uibModal, DeptService) {
      var vm = this;
      vm.ListData = [];
      vm.SearchEntity = {
          DepartmentName: ""
      }
      fnInitSearchValue();
      vm.FnClear = fnInitSearchValue;
      vm.FnSearch = fnSearch;
      vm.FnCreate = fnShowModalCreate;
      vm.FnEdit = fnShowModalEdit;
      vm.FnDelete = fnShowConfirm;
      function fnInitSearchValue() {
          vm.SearchEntity = {
              DepartmentName: ""
          }
          fnSearch();
      }

      function fnSearch() {
          DeptService.SearchDept(vm.SearchEntity).then(function (data) {
              vm.ListData = data;
              //fnClearSelected();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });

      }

      function fnShowConfirm(deptId) {
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
                  fnDelete(deptId);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };

      function fnDelete(deptId) {
          DeptService.DeleteDept(deptId).then(function (data) {
              fnSearch();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowModalCreate() {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7100_Department/NV7101_Create/view.html',
              controller: 'DeptCreateCtrl',
              controllerAs: 'vmCreate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7100_Department/NV7101_Create/controller.js',
                              'sections/NV7000_System/NV7100_Department/NV7101_Create/service.js'
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

      function fnShowModalEdit(deptId) {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7100_Department/NV7101_Edit/view.html',
              controller: 'DeptUpdateCtrl',
              controllerAs: 'vmUpdate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7100_Department/NV7101_Edit/controller.js',
                              'sections/NV7000_System/NV7100_Department/NV7101_Edit/service.js'
                          ]).then(
                              function () {
                                  return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                              }
                          );
                      }
                  ], items: function () {
                      return {DepartmentId: deptId};
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
