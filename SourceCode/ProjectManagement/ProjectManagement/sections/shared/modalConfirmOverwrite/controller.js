app.controller('ConfirmOverwriteCtrl', ['$scope', '$uibModalInstance', 'items', function ($scope, $modalInstance, items) {
    var vm = this;
    vm.title = items.Title;
    vm.check = true;

    vm.ok = function () {
        $modalInstance.close(true);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);