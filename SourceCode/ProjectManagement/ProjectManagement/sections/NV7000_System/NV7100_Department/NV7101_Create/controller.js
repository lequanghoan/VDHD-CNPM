app.controller('DeptCreateCtrl', ['$rootScope', '$scope', '$http', '$uibModal', '$uibModalInstance', 'DeptCreateService',
  function ($rootScope, $scope, $http, $uibModal, $uibModalInstance, DeptCreateService) {
      var vm = this;
      vm.CreateEntity = {
          DepartmentName: "",
          Note: ""
      }
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreateDept;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnCreateDept() {
          DeptCreateService.CreateDept(vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });

      }
  }
]);
