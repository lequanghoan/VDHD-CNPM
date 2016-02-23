app.controller('ProjectExpectedUpdateCtrl', ['$rootScope', '$scope', '$http', '$uibModal', '$uibModalInstance', 'ExpectedProjectUpdateService', 'items',
  function ($rootScope, $scope, $http, $uibModal, $uibModalInstance, ExpectedProjectUpdateService, items) {
      var vm = this;
      fnGetProjectById(items);
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnUpdateProject;

      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      };

      function fnUpdateProject() {
          ExpectedProjectUpdateService.UpdateProject(vm.UpdateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });
      };

      function fnGetProjectById(project) {
          ExpectedProjectUpdateService.GetProjectById(project).then(function (data) {
              vm.UpdateEntity = data;
          }, function (error) {
          });
      };
  }
]);
