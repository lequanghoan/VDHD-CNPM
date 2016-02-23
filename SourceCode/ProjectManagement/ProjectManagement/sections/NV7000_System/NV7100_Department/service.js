(function () {
    angular.module('app').factory('DeptService', DeptService);
    DeptService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function DeptService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var DeptServiceFactory = {
            SearchDept: searchDept, //hàm search theo điều kiện tìm kiếm
            DeleteDept: deleteDept
        };

        return DeptServiceFactory;

        function searchDept(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/department/SearchDept';
            $http.post(url, JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } })
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

        function deleteDept(deptId) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/department/DeleteDept';
            var deleteObj = {
                DepartmentId: deptId
            };
            $http.post(url, JSON.stringify(deleteObj), { headers: { 'Content-Type': 'application/json' } })
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