app.controller('ScheduleCreateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'items', 'ScheduleCreateService',
  function ($scope, $http, $uibModal, $uibModalInstance, items, ScheduleCreateService) {
      var vm = this;
      vm.ListYear = [];
      vm.ListMonth = [];
      vm.invalidTime = true;
      for (var i = 2010; i < 2051; i++)
          vm.ListYear.push({ id: i, name: i });
      for (var i = 1; i < 13; i++)
          vm.ListMonth.push({ id: i, name: i });
      vm.CreateEntity = {
          ScheduleName: "",
          Content: "",
          MonthFrom: 0,
          YearFrom: 0,
          MonthTo: 0,
          YearTo: 0,
          IsComplete: false,
          ProjectId: items.ProjectId,
          Note: ""
      }
      fnInitValue();
      vm.ChangeTime = fnCheckTime;
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnCreateSchedule;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnCheckTime() {
          if (vm.CreateEntity.YearFrom <= vm.CreateEntity.YearTo)
              if (vm.CreateEntity.MonthFrom <= vm.CreateEntity.MonthTo)
                  vm.invalidTime = false;
      }

      function fnInitValue() {
          var d = new Date();
          var m = d.getMonth();
          var y = d.getFullYear();
          vm.CreateEntity.MonthFrom = m + 1;
          vm.CreateEntity.YearFrom = y;
          vm.CreateEntity.YearTo = y;
          vm.CreateEntity.MonthTo = m + 1;
      }

      function fnCreateSchedule() {
          ScheduleCreateService.CreateSchedule(vm.CreateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });

      }
  }
]);
