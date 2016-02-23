(function () {
    'use strict';

    angular.module('app').factory('DeptCreateService', DeptCreateService);

    // Inject some dependencies
    DeptCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function DeptCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var DeptCreateServiceFactory = {
            CreateDept: createDept,
            GetDataCombobox: getDataCombobox, // trả về các cb trên giao diện hiện tại
        };

        return DeptCreateServiceFactory;

        function createDept(dept) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/department/CreateDept';

            $http.post(url, JSON.stringify(dept), { headers: { 'Content-Type': 'application/json' } })
               .success(function (response) {
                   deferred.resolve(response);
                   return response;
               })
               .error(function (errMessage, statusCode) {
                   var result = { isSuccess: false, status: statusCode, message: errMessage };
                   deferred.reject(result);
                   return result;
               });

            return deferred.promise;
        }

        // Lấy giá trị cho cb
        function getDataCombobox() {

            var deferred = $q.defer();
            //var url = serviceBase + 'api/TL3270/GetComboboxInfo';

            $http.post(url, JSON.stringify(userData), { headers: { 'Content-Type': 'application/json' } })
               .success(function (response) {
                   deferred.resolve(response);
                   return response;
               })
               .error(function (errMessage, statusCode) {
                   var result = { isSuccess: false, status: statusCode, message: errMessage };
                   deferred.reject(result);
                   return result;
               });

            return deferred.promise;
        }
    }
})();