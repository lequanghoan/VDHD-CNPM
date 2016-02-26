app.controller('ProjectExpectedCreateCtrl', ['$rootScope', '$scope', '$http', '$uibModal', '$uibModalInstance', 'ExpectedProjectCreateService','notify',
  function ($rootScope, $scope, $http, $uibModal, $uibModalInstance, ExpectedProjectCreateService,notify) {
      var vm = this;
      vm.CreateEntity = {
          ProjectNameExpected: "",
          Agency: "",
          PlanYear: "",
          ProjectType: 1,
          Necessary: "",
          TargetExpected: "",
          ContentExpected: "",
          ProductExpected: "",
          FundsForExpected: 0,
      }

      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreateProject;

      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      };

      function fnCreateProject() {
          //vm.CreateEntity.TargetExpected = vm.CreateEntity.Target;
          //vm.CreateEntity.ContentExpected = vm.CreateEntity.ProjectContent;
          //vm.CreateEntity.ProductExpected = vm.CreateEntity.Product;
          //vm.CreateEntity.FundsForExpected = vm.CreateEntity.FundsFor;
          //vm.CreateEntity.ProjectNameExpected = vm.CreateEntity.ProjetName;

          ExpectedProjectCreateService.CreateProject(vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              notify('Thêm mới không thành công!');
          });

      };
  }
]);
