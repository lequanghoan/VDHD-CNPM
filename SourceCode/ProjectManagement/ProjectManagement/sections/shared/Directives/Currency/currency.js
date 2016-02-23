app.directive('currencyFull', [function () {
    var options = {
        prefix: '',
        suffix: '',
        centsSeparator: '',
        thousandsSeparator: ',',
        limit: false,
        centsLimit: 0,
        clearPrefix: false,
        allowNegative: true,
        clearOnEmpty: true
    };

    var is_number = /[0-9]/;

    function toNumbers(str) {
        var formatted = '';
        for (var i = 0; i < (str.length) ; i++) {
            char = str.charAt(i);
            if (formatted.length == 0 && char == 0)
                char = false;

            if (char && char.match(is_number)) {
                if (options.limit) {
                    if (formatted.length < options.limit)
                        formatted = formatted + char;
                } else {
                    formatted = formatted + char;
                }
            }
        }

        return formatted;
    }

    function fillWithZeroes(str) {
        while (str.length < (options.centsLimit + 1)) {
            str = '0' + str;
        }
        return str;
    }

    function priceFormat(str, ignore) {
        if (!ignore && (str === '' || str == priceFormat('0', true)) && options.clearOnEmpty) {
            return '';
        }

        // formatting settings
        var formatted = fillWithZeroes(toNumbers(str));
        var thousandsFormatted = '';
        var thousandsCount = 0;

        // split integer from cents
        var centsVal = formatted.substr(formatted.length - options.centsLimit,
                options.centsLimit);
        var integerVal = formatted.substr(0, formatted.length - options.centsLimit);

        // apply cents pontuation
        formatted = integerVal + options.centsSeparator + centsVal;

        // apply thousands pontuation
        if (options.thousandsSeparator) {
            for (var j = integerVal.length; j > 0; j--) {
                char = integerVal.substr(j - 1, 1);
                thousandsCount++;
                if (thousandsCount % 3 == 0)
                    char = options.thousandsSeparator + char;
                thousandsFormatted = char + thousandsFormatted;
            }
            if (thousandsFormatted.substr(0, 1) == options.thousandsSeparator)
                thousandsFormatted = thousandsFormatted.substring(1,
                        thousandsFormatted.length);
            formatted = thousandsFormatted + options.centsSeparator + centsVal;
        }

        // if the string contains a dash, it is negative - add it to the
        // begining (except for zero)
        if (options.allowNegative && str.indexOf('-') != -1
                && (integerVal != 0 || centsVal != 0))
            formatted = '-' + formatted;

        // apply the prefix
        if (options.prefix) {
            formatted = options.prefix + formatted;
        }

        // apply the suffix
        if (options.suffix) {
            formatted = formatted + options.suffix;
        }

        return formatted;
    }


    return {
        restrict: 'E',
        scope: {
            'isValidate': '@',
            'textValidate': '@',
            'disableCurrency': '@',
            'viewType': '@',
            'modelMoney': '=',
            'valueChange': '&',
            'className': '@',
            'maxLength': '@',
        },
        templateUrl: 'sections/shared/Directives/Currency/currency.html',
        replace: true,
        controller: ['$scope', function ($scope) {
            var vm = $scope;
            vm.showValidate = false;
            vm.isRequired = false;
            vm.strMoney = "";
            vm.idDirective = guid();
            vm.limit = (vm.maxLength === "" || vm.maxLength === undefined || vm.maxLength === null) ? 100 : ((vm.maxLength - 1) / 3 + parseInt(vm.maxLength));

            if (vm.viewType != null && vm.viewType === "label") {
                vm.idDirective = guid();
            }

            vm.showInput = true;
            vm.showLabel = false;

            vm.isMustUpdate = false;

            //console.log(vm.modelMoney);

            initData();

            // is called when user input
            vm.fn = {
                changeValueUserInput: changeValueUserInput,
            };

            function initData() {
                if (vm.viewType != null && vm.viewType === "label") {
                    vm.showLabel = true;
                    vm.showInput = false;
                    if (vm.modelMoney === null || vm.modelMoney === "" || vm.modelMoney === undefined) {
                        vm.modelMoneyMask = "";
                    }
                    else {
                        vm.modelMoneyMask = priceFormat(vm.modelMoney.toString(), true);
                    }
                    vm.isMustUpdate = true;
                }
                else {
                    if ($scope.isValidate == 1) {
                        vm.showValidate = true;
                        vm.isRequired = true;
                    }
                    vm.modelMoneyMask = vm.modelMoney;
                    vm.isMustUpdate = true;
                }

                $scope.$watch('modelMoney', function () {

                    var currentValue = $("#" + vm.idDirective).unmask();
                    if (currentValue == vm.modelMoney) return;

                    if (vm.modelMoney === null || vm.modelMoney === "" || vm.modelMoney === undefined) {
                        vm.modelMoneyMask = "";
                    }
                    else {
                        vm.modelMoneyMask = priceFormat(vm.modelMoney.toString(), true);
                    }

                });
            }

            function changeValueUserInput() {
                if (!vm.isMustUpdate) {
                    return;
                }

                //var caret = $("#" + vm.idDirective).caret();
                $("#" + vm.idDirective).priceFormat({
                    prefix: '',
                    suffix: '',
                    centsSeparator: '',
                    thousandsSeparator: ',',
                    centsLimit: 0,
                    allowNegative: true,
                    clearOnEmpty: true,
                });

                var currentValue = $("#" + vm.idDirective).unmask();
                if (currentValue != vm.modelMoney) {
                    vm.modelMoney = $("#" + vm.idDirective).unmask();

                    vm.$apply();

                    //$("#" + vm.idDirective).caret(caret);

                    if ($scope.valueChange != null) {
                        $scope.valueChange();
                    }
                }
            }
        }],
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }



}]);
