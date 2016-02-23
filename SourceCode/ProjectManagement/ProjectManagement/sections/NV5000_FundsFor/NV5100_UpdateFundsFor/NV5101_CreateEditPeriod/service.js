(function () {
    angular.module('app').factory('UpdateTimeService', UpdateTimeService);
    UpdateTimeService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function UpdateTimeService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var UpdateTimeServiceFactory = {
            SearchPeriod: searchPeriod,
            AddPeriod: addPeriod,
            UpdatePeriod: updatePeriod,
        };

        return UpdateTimeServiceFactory;

        function searchPeriod(periodId) {
            var url = serviceBase + 'api/FundsFor/SearchPeriodById';
            var deferred = $q.defer();
            $http.post(url, { PeriodId: periodId }, { headers: { 'Content-Type': 'application/json' } })
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

        function addPeriod(period) {
            var url = serviceBase + 'api/FundsFor/AddPeriod';
            var deferred = $q.defer();
            $http.post(url, JSON.stringify(period), { headers: { 'Content-Type': 'application/json' } })
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

        function updatePeriod(period) {
            var url = serviceBase + 'api/FundsFor/UpdatePeriod';
            var deferred = $q.defer();
            $http.post(url, JSON.stringify(period), { headers: { 'Content-Type': 'application/json' } })
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