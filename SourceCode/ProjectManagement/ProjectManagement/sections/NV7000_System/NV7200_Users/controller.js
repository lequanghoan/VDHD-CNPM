app.controller('UserCtrl', ['$scope', '$http', '$uibModal', 'UserService',
  function ($scope, $http, $uibModal, UserService) {
      var vm = this;
      vm.ListData = [];
      vm.ListStatus = [
          { "id": true, "name": "Khóa" },
          { "id": false, "name": "Không khóa" }
      ];
      vm.SearchEntity = {
          FullName: "",
          Position: "0",
          Status: "0"
      }
      vm.FnClear = fnInitSearchValue;
      vm.FnSearch = fnSearch;
      vm.FnCreate = fnShowModalCreate;
      vm.FnEdit = fnShowModalEdit;
      vm.FnDelete = fnShowConfirm;
      vm.Convert = fnConvert;
      vm.FnChangeLock = fnLockUser;

      function fnInitSearchValue() {
          vm.SearchEntity = {
              FullName: "",
              Position: "0",
              Status: "0"
          }
      }

      function fnConvert(a) {
          switch (a) {
              case 1:
                  return "Trưởng phòng";
              case 2:
                  return "Phó phòng";
              case 3:
                  return "Chuyên viên";
              case 4:
                  return "Giám đốc";
              case 5:
                  return "Phó Giám đốc";
          }
      }

      function fnSearch() {
          UserService.SearchUser(vm.SearchEntity).then(function (data) {
              vm.ListData = data;
              //fnClearSelected();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowConfirm(userId) {
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
                  fnDelete(userId);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };

      function fnDelete(userId) {
          UserService.DeleteUser(userId).then(function (data) {
              fnSearch();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnLockUser(user) {
          var obj = {
              UserId: user.UserId,
              LockoutEnabled: user.LockoutEnabled
          }
          UserService.LockUser(obj).then(function (data) {
              fnSearch();
          }, function (error) {
              vm.ListData = null;
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowModalCreate() {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7200_Users/NV7201_Create/view.html',
              controller: 'UserCreateCtrl',
              controllerAs: 'vmCreate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7200_Users/NV7201_Create/controller.js',
                              'sections/NV7000_System/NV7200_Users/NV7201_Create/service.js'
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

      function fnShowModalEdit(userId) {
          var modalInstance = $uibModal.open({
              templateUrl: 'sections/NV7000_System/NV7200_Users/NV7201_Edit/view.html',
              controller: 'UserUpdateCtrl',
              controllerAs: 'vmUpdate',
              windowClass: 'app-modal-window-select-create',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                              'sections/NV7000_System/NV7200_Users/NV7201_Edit/controller.js',
                              'sections/NV7000_System/NV7200_Users/NV7201_Edit/service.js'
                          ]).then(
                              function () {
                                  return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                              }
                          );
                      }
                  ], items: function () {
                      return { UserId: userId };
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
