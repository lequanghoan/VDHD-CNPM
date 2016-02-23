app.controller('UserUpdateCtrl', ['$scope', '$http', '$uibModal', '$uibModalInstance', 'items', 'UserUpdateService',
function ($scope, $http, $uibModal, $uibModalInstance, items, UserUpdateService) {
    var vm = this;
    vm.DatePicker = {
        open2: false,
    };

    vm.DatePicker.open = function ($event, type) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.DatePicker[type] = true;

    };

    vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    vm.UpdateEntity = {
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
    vm.ListDepartment = [];
    vm.ListPosition = [
        { id: 1, name: "Trưởng phòng" },
          { id: 2, name: "Phó phòng" },
          { id: 3, name: "Chuyên viên" },
          { id: 4, name: "Giám đốc" },
          { id: 5, name: "Phó Giám đốc" }
    ];
    fnGetDataCombobox();
    fnGetUserById(items);

    vm.FnCancel = fnCloseModal;
    vm.FnSave = fnUpdateUser;
    function fnCloseModal() {
        $uibModalInstance.dismiss('cancel');
    }
    function fnUpdateUser() {
        UserUpdateService.UpdateUser(vm.UpdateEntity).then(function (data) {
            $uibModalInstance.close(true);
        }, function (error) {
        });

    }

    function fnGetDataCombobox() {
        UserUpdateService.GetDataCombobox().then(function (data) {
            vm.ListDepartment = data;
        }, function (error) {
        });
    }

    function fnGetUserById(obj) {
        UserUpdateService.GetUserById(obj).then(function (data) {
            vm.UpdateEntity = data;
            vm.UpdateEntity.Birthday = new Date(vm.UpdateEntity.Birthday);
        }, function (error) {

        });
    }
}
]);