app.controller('CareerCtrl', ['$scope', '$http', '$uibModal', 'CareerService',
  function ($scope, $http, $uibModal, CareerService) {
      var vm = this;
      vm.ListData = [];
      vm.SearchEntity = {
          CareerName: ""
      }
      fnInitSearchValue();
      vm.FnClear = fnInitSearchValue;
      vm.FnSearch = fnSearch;
      vm.FnCreate = fnShowModalCreate;
      vm.FnEdit = fnShowModalEdit;
      vm.FnDelete = fnShowConfirm;
      function fnInitSearchValue() {
          vm.SearchEntity = {
              CareerName: ""
          }
          fnSearch();
      }

      function fnSearch() {
          CareerService.SearchCareer(vm.SearchEntity).then(function (data) {
              vm.ListData = data;
              //fnClearSelected();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowConfirm(careerId) {
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
                  fnDelete(careerId);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };

      function fnDelete(careerId) {
          CareerService.DeleteCareer(careerId).then(function (data) {
              fnSearch();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowModalCreate() {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7300_Career/NV7301_Create/view.html',
              controller: 'CareerCreateCtrl',
              controllerAs: 'vmCreate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7300_Career/NV7301_Create/controller.js',
                              'sections/NV7000_System/NV7300_Career/NV7301_Create/service.js'
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

      function fnShowModalEdit(careerId) {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7300_Career/NV7301_Edit/view.html',
              controller: 'CareerUpdateCtrl',
              controllerAs: 'vmUpdate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7300_Career/NV7301_Edit/controller.js',
                              'sections/NV7000_System/NV7300_Career/NV7301_Edit/service.js'
                          ]).then(
                              function () {
                                  return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                              }
                          );
                      }
                  ], items: function () {
                      return { CareerId: careerId };
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
