(function () {
    'use strict';

    angular.module('app').factory('DeptUpdateService', DeptUpdateService);

    // Inject some dependencies
    DeptUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function DeptUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var DeptUpdateServiceFactory = {
            UpdateDept: updateDept,
            GetDepartmentById: getDepartmentById
        };

        return DeptUpdateServiceFactory;

        function updateDept(dept) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/department/UpdateDept';

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
        function getDepartmentById(dept) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/department/GetDepartmentById';

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

    }
})();