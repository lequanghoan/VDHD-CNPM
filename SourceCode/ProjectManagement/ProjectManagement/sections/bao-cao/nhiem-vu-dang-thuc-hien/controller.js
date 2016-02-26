app.controller('BaoCaoNhiemVuDangTHCtrl', ['$scope', '$http', '$uibModal',
  function ($scope, $http, $uibModal) {
      var vm = this;
      vm.ListYear = [];
      vm.ListData = [];
      vm.ListCategory = [
          {
              "id": "",
              "name": "<Tất cả>"
          },
          {
              "id": "dt",
              "name": "Đề tài"
          },
          {
              "id": "da",
              "name": "Dự án"
          }
      ];

      vm.ListDepartment = [];
      vm.SearchEntity = {
          TopicName: "",
          Status: "1",
          Category: "",
          Department: "",
          Year: ""
      }
      vm.FnClear = fnInitSearchValue;
      vm.FnSearch = fnSearch;
      function fnInitSearchValue() {
          vm.SearchEntity = {
              TopicName: "",
              Status: "1",
              Category: "",
              Department: "",
              Year: ""
          }
      }
      $http.get('data/list-bao-cao-1.json').success(function (data) {
          vm.ListData = data;
      });
      function fnSearch() {

      }

      vm.settingDatatable = {
          sScrollX: '200%',
      }
      $http.get('data/list-year.json').success(function (data) {
          vm.ListYear = data;
      });
      $http.get('data/list-dep.json').success(function (data) {
          vm.ListDepartment = data;
      });
  }
]);
