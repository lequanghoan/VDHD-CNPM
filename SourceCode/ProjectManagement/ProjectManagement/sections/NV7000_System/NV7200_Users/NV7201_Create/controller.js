app.controller('UserCreateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'UserCreateService',
  function ($scope, $http, $uibModal, $uibModalInstance, UserCreateService) {
      var vm = this;
      vm.ListDepartment = [];
      vm.ListPosition = [
          { id: 1, name: "Trưởng phòng" },
          { id: 2, name: "Phó phòng" },
          { id: 3, name: "Chuyên viên" },
          { id: 4, name: "Giám đốc" },
          { id: 5, name: "Phó Giám đốc" }
      ];
      vm.CreateEntity = {
          FullName: "",
          UserName: "",
          Email: "",
          PhoneNumber: "",
          DepartmentId: "",
          Address: "",
          Birthday: "",
          RoleAdmin: false,
          Position: ""
      }
      fnGetDataCombobox();
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreate;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnGetDataCombobox() {
          UserCreateService.GetDataCombobox().then(function (data) {
              vm.ListDepartment = data;
          }, function (error) {
          });
      }

      function fnCreate() {
          UserCreateService.CreateUser(vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });

      }
  }
]);
