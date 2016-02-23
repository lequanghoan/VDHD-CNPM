(function () {
    angular.module('app').factory('CareerService', CareerService);
    CareerService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function CareerService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var CareerServiceFactory = {
            SearchCareer: searchCareer, //hàm search theo điều kiện tìm kiếm
            DeleteCareer: deleteCareer
        };

        return CareerServiceFactory;

        function searchCareer(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/career/SearchCareer';
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

        function deleteCareer(careerId) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/career/DeleteCareer';
            var deleteObj = {
                CareerId: careerId
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