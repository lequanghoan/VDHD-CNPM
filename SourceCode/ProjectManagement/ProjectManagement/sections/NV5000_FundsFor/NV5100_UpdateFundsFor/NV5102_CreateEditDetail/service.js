(function () {
    angular.module('app').factory('UpdateDetailService', UpdateDetailService);
    UpdateDetailService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function UpdateDetailService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var UpdateDetailServiceFactory = {
            SearchPeriodDetail: searchPeriodDetail,
            AddPeriodDetail: addPeriodDetail,
            UpdatePeriodDetail: updatePeriodDetail,
        };

        return UpdateDetailServiceFactory;

        function searchPeriodDetail(PeriodDetailId) {
            var url = serviceBase + 'api/FundsFor/SearchPeriodDetailById';
            var deferred = $q.defer();
            $http.post(url, { PeriodDetailId: PeriodDetailId }, { headers: { 'Content-Type': 'application/json' } })
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

        function addPeriodDetail(PeriodDetail) {
            var url = serviceBase + 'api/FundsFor/AddPeriodDetail';
            var deferred = $q.defer();
            $http.post(url, JSON.stringify(PeriodDetail), { headers: { 'Content-Type': 'application/json' } })
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

        function updatePeriodDetail(PeriodDetail) {
            var url = serviceBase + 'api/FundsFor/UpdatePeriodDetail';
            var deferred = $q.defer();
            $http.post(url, JSON.stringify(PeriodDetail), { headers: { 'Content-Type': 'application/json' } })
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