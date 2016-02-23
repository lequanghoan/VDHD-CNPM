(function () {
    angular.module('app').factory('FundsForService', FundsForService);
    FundsForService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function FundsForService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var FundsForServiceFactory = {
            SearchProject: searchProject, //hàm search theo điều kiện tìm kiếm
            GetComboboxDepartment: getComboboxDepartment,
        };

        return FundsForServiceFactory;

        function searchProject(searchCondition) {
            var url = serviceBase + 'api/FundsFor/SearchProject';
            var deferred = $q.defer();
            $http.post(url, JSON.stringify(searchCondition), { headers: { 'Content-Type': 'application/json' } })
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

        function getComboboxDepartment() {
            var url = serviceBase + 'api/project/GetComboboxDepartment';
            var deferred = $q.defer();
            $http.post(url, {}, { headers: { 'Content-Type': 'application/json' } })
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