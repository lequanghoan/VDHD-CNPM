app.directive('datepickerFull', [function () {
    return {
        restrict: 'E',
        scope: {
            'searchMode': '@',
            'isValidate': '@',
            'textValidate': '@',
            'modelDate': '=',
            'disableDatepicker': '@',
        },
        templateUrl: 'sections/shared/Directives/DatePicker/datepicker.html',
        replace: true,
        controller: ['$scope', function ($scope) {
            var vm = $scope;
            vm.showValidate = false;
            vm.isRequired = false;

            vm.DatePicker = {
                status: {
                    opened: false
                },
                open: function ($event) {
                    if (!$scope.disableDatepicker == 1)
                        vm.DatePicker.status.opened = true;
                }
            };

            initData();

            function initData() {

                if ($scope.searchMode == 1) {
                    $scope.modelDate = addDays(new Date(), -7);
                    $scope.$watch('modelDate', function () {
                        if ($scope.modelDate == null) {
                            $scope.modelDate = addDays(new Date(), -7);
                        }
                    });
                } else {
                    if ($scope.modelDate != null) {
                        $scope.$watch('modelDate', function () {
                            if (typeof $scope.modelDate != 'string')
                                $scope.modelDate = addDays($scope.modelDate, 0);
                        });
                    }
                }
                if ($scope.isValidate == 1) {
                    vm.showValidate = true;
                    vm.isRequired = true;
                }
            }

        }],
    };

    function toyyyyMMdd(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
    }

    function addDays(theDate, days) {
        var a = new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
        return toyyyyMMdd(a);
    }

}]);
