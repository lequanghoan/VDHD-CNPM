app.controller('DeptUpdateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'items', 'DeptUpdateService',
  function ($scope, $http, $uibModal, $uibModalInstance, items, DeptUpdateService) {
      var vm = this;
      vm.UpdateEntity = {
          DepartmentId: "",
          DepartmentName: "",
          Note: ""
      }
      fnGetDeptById(items);
      
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnUpdateDept;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }
      function fnUpdateDept() {
          DeptUpdateService.UpdateDept(vm.UpdateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
          });

      }
      function fnGetDeptById(dept) {
          DeptUpdateService.GetDepartmentById(dept).then(function (data) {
              vm.UpdateEntity = data;
          }, function (error) {
              
          });
      }
  }
]);