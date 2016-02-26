(function () {
    'use strict';

    angular.module('app').factory('ScheduleCreateService', ScheduleCreateService);

    // Inject some dependencies
    ScheduleCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ScheduleCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ScheduleCreateServiceFactory = {
            CreateSchedule: createSchedule,
        };

        return ScheduleCreateServiceFactory;

        function createSchedule(schedule) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/Schedule/CreateSchedule';

            $http.post(url, JSON.stringify(schedule), { headers: { 'Content-Type': 'application/json' } })
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