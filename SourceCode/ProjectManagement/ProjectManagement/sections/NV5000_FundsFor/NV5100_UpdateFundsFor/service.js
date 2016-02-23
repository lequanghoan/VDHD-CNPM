(function () {
    angular.module('app').factory('FundsForUpdateService', FundsForUpdateService);
    FundsForUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function FundsForUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var FundsForUpdateServiceFactory = {
            GetComboboxProject: getComboboxProject,
            SearchPeriod: searchPeriod,
            SearchPeriodDetail: searchPeriodDetail,
            DeletePeriod: deletePeriod,
            DeletePeriodDetail: deletePeriodDetail,
            UpdatePeriodTransfer: updatePeriodTransfer
        };

        return FundsForUpdateServiceFactory;

        function getComboboxProject(planYear) {
            var url = serviceBase + 'api/FundsFor/GetComboboxProject';
            var deferred = $q.defer();
            $http.post(url, { PlanYear: planYear }, { headers: { 'Content-Type': 'application/json' } })
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

        function searchPeriod(projectId) {
            var url = serviceBase + 'api/FundsFor/SearchPeriod';
            var deferred = $q.defer();
            $http.post(url, {ProjectId: projectId}, { headers: { 'Content-Type': 'application/json' } })
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

        function searchPeriodDetail(projectId, year) {
            var url = serviceBase + 'api/FundsFor/SearchPeriodDetail';
            var deferred = $q.defer();
            $http.post(url, { ProjectId: projectId, Year: year }, { headers: { 'Content-Type': 'application/json' } })
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

        function deletePeriod(periodId) {
            var url = serviceBase + 'api/FundsFor/DeletePeriod';
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

        function deletePeriodDetail(Id) {
            var url = serviceBase + 'api/FundsFor/DeletePeriodDetail';
            var deferred = $q.defer();
            $http.post(url, { PeriodDetailId: Id }, { headers: { 'Content-Type': 'application/json' } })
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

        function updatePeriodTransfer(period) {
            var url = serviceBase + 'api/FundsFor/UpdateTransferPeriod';
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