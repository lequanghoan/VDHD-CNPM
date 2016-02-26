app.controller('ProfileUpdateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'ProfileUpdateService', 'items',
  function ($scope, $http, $uibModal, $uibModalInstance, ProfileUpdateService, items) {
      var vm = this;
      vm.file = null;
      $scope.notAFile = true;
      vm.FileName = "";
      vm.ListProject = [];
      vm.UpdateEntity = {
          ProfileName: "",
          Description: "",
          ProjectId: items.ProfileId,
          FileName: "",
          PathFile: ""
      }
      fnInitValue(items.ProfileId);
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnUpdate;
      vm.FnDownload = fnDownload;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnInitValue(profileId) {
          ProfileUpdateService.GetProfileById(profileId).then(function (data) {
              vm.UpdateEntity = data;
              vm.FileName = vm.UpdateEntity.FileName;
          }, function (error) {
              fnShowMessage(error.message, 1);
          });
      }

      function fnDownload(profile) {
          var profile = {
              FileName: vm.FileName,
              PathFile: vm.UpdateEntity.PathFile
          }
          ProfileUpdateService.DownloadProfile(profile).then(function (data) {
              var file = new Blob([data], { type: undefined });
              saveAs(file, profile.FileName);
          }, function (error) {
              fnShowMessage(error.message, 1);
          });
      }

      function fnUpdate() {
          if (vm.file == null || vm.file == undefined) {
              fnExeUpdate();
          } else {
              vm.UpdateEntity.FileName = vm.file.name;
              // Kiểm tra xem profile đã tồn tại chưa
              ProfileUpdateService.CheckFileExistToUpdate(vm.UpdateEntity).then(function (data) {
                  // Nếu chỉnh sửa với tên file trùng với tên file của hồ sơ khác thì hiển thị thông báo không cho sửa
                  if (data)
                      fnShowConfirmOverwrite();
                  else
                      fnExeUpdate();
              }, function (error) {
                  fnShowMessage(error.message, 1);
              });
          }
      }

      function fnExeUpdate() {
          ProfileUpdateService.UpdateProfile(vm.file, vm.UpdateEntity).then(function (data) {
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
                      return { Title: "Đã tồn tại hồ sơ với tên là " + vm.UpdateEntity.FileName + ".Bạn có muốn ghi đè lên hồ sơ cũ không?" };
                  }
              }
          });
          modalOverwrite.result.then(function (rs) {
              if (rs)
                  fnUpdate();
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
  }
]);
