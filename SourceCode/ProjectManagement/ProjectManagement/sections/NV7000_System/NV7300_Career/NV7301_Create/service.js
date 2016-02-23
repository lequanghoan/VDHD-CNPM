(function () {
    'use strict';

    angular.module('app').factory('CareerCreateService', CareerCreateService);

    // Inject some dependencies
    CareerCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function CareerCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var CareerCreateServiceFactory = {
            CreateCareer: createCareer,
        };

        return CareerCreateServiceFactory;

        function createCareer(career) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/career/CreateCareer';

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