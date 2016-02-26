(function () {
    angular.module('app').factory('ScheduleService', ScheduleService);
    ScheduleService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ScheduleService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ScheduleServiceFactory = {
            SearchSchedule: searchSchedule,
            DeleteSchedule: deleteSchedule,
            GetAllProjectByYear: getAllProjectByYear
        };

        return ScheduleServiceFactory;

        function searchSchedule(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/schedule/SearchSchedule';
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

        function getAllProjectByYear(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/GetAllProjectByYear';
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

        function deleteSchedule(scheduleId) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/Schedule/DeleteSchedule';
            var deleteObj = {
                ScheduleId: scheduleId
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