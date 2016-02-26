app.controller('ProfileCreateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'ProfileCreateService', 'items',
  function ($scope, $http, $uibModal, $uibModalInstance, ProfileCreateService, items) {
      var vm = this;
      vm.ListProject = [];
      vm.CreateEntity = {
          ProfileName: "",
          Description: "",
          ProjectId: items.ProjectId,
          FileName: "",
          PathFile: ""
      }
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreate;

      fnCheckHaveFile();
      $scope.changeFile = fnCheckHaveFile;

      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnCreate() {
          if (vm.file === null || vm.file === undefined) {
              fnExeCreate();
          }
          else {
              vm.CreateEntity.FileName = vm.file.name;
              // Kiểm tra xem profile đã tồn tại chưa
              ProfileCreateService.CheckFileExist(vm.CreateEntity).then(function (data) {
                  // Nếu đã tồn tại thì hiển thị confirm ghi đè hay không
                  if (data)
                      fnShowConfirmOverwrite();
                  else
                      fnExeCreate();
              }, function (error) {
                  fnShowMessage(error.message, 1);
              });
          }
      }

      function fnCheckHaveFile() {
          if (vm.file === null || vm.file === undefined) {
              $scope.notAFile = true;
          } else {
              $scope.notAFile = false;
          }
      };

      function fnExeCreate() {
          ProfileCreateService.CreateProfile(vm.file, vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              fnShowMessage(error.message, 1);
          });
      }

      function fnShowConfirmOverwrite() {
          var modalOverwrite = $uibModal.open({
              templateUrl: 'sections/shared/modalConfirmWithTitle/view.html',
              controller: 'ConfirmOverwriteCtrl',
              controllerAs: 'vmPopup',
              resolve: {
                  deps: ['uiLoad',
                                  function (uiLoad) {
                                      return uiLoad.load('sections/shared/modalConfirmWithTitle/controller.js');
                                  }
                  ], items: function () {
                      return { Title: "Đã tồn tại hồ sơ với tên là " + vm.CreateEntity.FileName + ".Bạn có muốn ghi đè lên hồ sơ cũ không?" };
                  }
              }
          });
          modalOverwrite.result.then(function (rs) {
              if (rs)
                  fnUpdate();
          }, function () {
              //$log.info('Modal dismissed at: ' + new Date());
          });
      };

      function fnUpdate() {
          ProfileCreateService.UpdateProfile(vm.file, vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              fnShowMessage(error.message, 1);
          });
      }
  }
]);
