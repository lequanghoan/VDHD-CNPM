(function () {
    'use strict';

    angular.module('app').factory('ScheduleUpdateService', ScheduleUpdateService);

    // Inject some dependencies
    ScheduleUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ScheduleUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ScheduleUpdateServiceFactory = {
            UpdateSchedule: updateSchedule,
            GetScheduleById: getScheduleById
        };

        return ScheduleUpdateServiceFactory;

        function updateSchedule(schedule) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/schedule/UpdateSchedule';

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
        function getScheduleById(schedule) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/schedule/GetScheduleById';

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