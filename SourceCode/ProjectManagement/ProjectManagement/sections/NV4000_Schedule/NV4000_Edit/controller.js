app.controller('ScheduleUpdateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'items', 'ScheduleUpdateService',
  function ($scope, $http, $uibModal, $uibModalInstance, items, ScheduleUpdateService) {
      var vm = this;
      vm.invalidTime = true;
      vm.ListYear = [];
      vm.ListMonth = [];
      for (var i = 2010; i < 2031; i++)
          vm.ListYear.push({ id: i, name: i });
      for (var i = 1; i < 13; i++)
          vm.ListMonth.push({ id: i, name: i });
      vm.UpdateEntity = {
          ScheduleName: "",
          Content: "",
          MonthFrom: 0,
          YearFrom: 0,
          MonthTo: 0,
          YearTo: 0,
          IsComplete: false,
          ProjectId: "",
          Note: ""
      }
      fnInitValue();
      vm.ChangeTime = fnCheckTime;
      vm.FnCancel = fnCloseModal;
      vm.FnSave = fnUpdateSchedule;
      function fnCloseModal() {
          $uibModalInstance.dismiss('cancel');
      }

      function fnCheckTime() {
          if (vm.CreateEntity.YearFrom <= vm.CreateEntity.YearTo)
              if (vm.CreateEntity.MonthFrom <= vm.CreateEntity.MonthTo)
                  vm.invalidTime = false;
      }

      function fnInitValue() {
          fnGetScheduleById(items);
      }

      function fnGetScheduleById(schedule) {
          ScheduleUpdateService.GetScheduleById(schedule).then(function (data) {
              vm.UpdateEntity = data;
          }, function (error) {

          });
      }

      function fnUpdateSchedule() {
          ScheduleUpdateService.UpdateSchedule(vm.UpdateEntity).then(function (data) {
              $uibModalInstance.close(true);
          }, function (error) {
              $uibModalInstance.close(false);
          });

      }
  }
]);
