(function () {
    'use strict';

    angular.module('app').factory('ExpectedProjectUpdateService', ExpectedProjectUpdateService);

    // Inject some dependencies
    ExpectedProjectUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ExpectedProjectUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ExpectedProjectUpdateServiceFactory = {
            UpdateProject: updateProject,
            GetProjectById: getProjectById,
        };

        return ExpectedProjectUpdateServiceFactory;

        function updateProject(project) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/UpdateProject';

            $http.post(url, JSON.stringify(project), { headers: { 'Content-Type': 'application/json' } })
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
        function getProjectById(project) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/GetProjectById';

            $http.post(url, JSON.stringify(project), { headers: { 'Content-Type': 'application/json' } })
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