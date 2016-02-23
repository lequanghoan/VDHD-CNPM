app.controller('ListMoneyCtrl', ['$scope', '$http', '$uibModal', '$q', 'FundsForService', 'notify', '$log', function ($scope, $http, $modal, $q, FundsForService, notify, $log) {
    var vm = this;

    //init search condition
    vm.searchCondition = {
        projectName: "",
        status: 0,
        planYear: 0,
        departmentId: ""
    };

    vm.FnSearch = fnSearch;
    vm.FnClear = fnClear;
    vm.FnShowModal = fnShowModal;


    //init option for combobox
    vm.options = {
        status: [{ value: 0, name: "<Tất cả>" }, { value: 1, name: "Đang thực hiện" }, { value: 4, name: "Đã hoàn thành" }],
        department: [],
        year: []
    }

    //init total
    vm.total = {
        fundsfor: 0,
        amount: 0,
        paid: 0,
        notget: 0,
        getback: 0,
        notpaid: 0
    }

    //set value for option year
    vm.options.year = [{ value: 0, name: "Tất cả" }];
    for (var i = 2010; i < 2051; i++)
        vm.options.year.push({ value: i, name: i });

    //init page
    fnInitPage();

    function fnInitPage() {
        FundsForService.GetComboboxDepartment().then(function (data) {
            vm.options.department = data;
            fnSearch();
        }, function (error) {
            alert(error.message);
        });
    };

    function fnClear() {
        vm.searchCondition = {
            projectName: "",
            status: 0,
            planYear: 0,
            departmentId: ""
        };
    };


    //search project
    function fnSearch() {
        FundsForService.SearchProject(vm.searchCondition).then(function (data) {
            vm.projects = data;
            calculateTotal();
        }, function (error) {
            alert(error.message);
        });

    }

    //calculate total
    function calculateTotal() {

        vm.total = {
            fundsfor: 0,
            amount: 0,
            paid: 0,
            notget: 0,
            getback: 0,
            notpaid: 0
        };

        for(i=0; i<vm.projects.length; i++)
        {
            vm.total.fundsfor += vm.projects[i].FundsFor;
            vm.total.amount += vm.projects[i].Amount;
            vm.total.paid += vm.projects[i].Paid;
            vm.total.getback += vm.projects[i].GetBack;
        }
        vm.total.notget = vm.total.fundsfor - vm.total.amount;
        vm.total.notpaid = vm.total.fundsfor - vm.total.paid;

    }

    //show modal update
    function fnShowModal(id, fundsfor) {
        var modalInstance = $modal.open({
            templateUrl: 'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/view.html',
            controller: 'UpdateMoneyCtrl',
            controllerAs: 'vmUpdate',
            windowClass: 'app-modal-window',
            //size: 'lg',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/controller.js',
                            'sections/NV5000_FundsFor/NV5100_UpdateFundsFor/service.js'
                        ]);
                    }
                ], obj: function () {
                    return { projectId: id, fundsfor: fundsfor };
                }
            }
        });
    };

}]);