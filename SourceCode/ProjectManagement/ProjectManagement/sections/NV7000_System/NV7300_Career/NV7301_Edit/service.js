(function () {
    'use strict';

    angular.module('app').factory('CareerUpdateService', CareerUpdateService);

    // Inject some dependencies
    CareerUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function CareerUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var CareerUpdateServiceFactory = {
            UpdateCareer: updateCareer,
            GetCareerById: getCareerById
        };

        return CareerUpdateServiceFactory;

        function updateCareer(career) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/career/UpdateCareer';

            $http.post(url, JSON.stringify(career), { headers: { 'Content-Type': 'application/json' } })
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
        function getCareerById(career) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/career/GetCareerById';

            $http.post(url, JSON.stringify(career), { headers: { 'Content-Type': 'application/json' } })
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