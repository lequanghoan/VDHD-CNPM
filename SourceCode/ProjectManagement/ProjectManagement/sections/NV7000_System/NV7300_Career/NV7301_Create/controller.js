app.controller('CareerCreateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'CareerCreateService',
  function ($scope, $http, $uibModal, $uibModalInstance, CareerCreateService) {
      var vm = this;
      vm.CreateEntity = {
          CareerName: "",
          Note: ""
      }
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreate;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }
      function fnCreate() {
          CareerCreateService.CreateCareer(vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });

      }
  }
]);
