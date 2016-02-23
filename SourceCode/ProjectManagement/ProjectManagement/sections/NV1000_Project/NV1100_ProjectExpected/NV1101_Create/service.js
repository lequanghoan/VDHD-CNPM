(function () {
    'use strict';

    angular.module('app').factory('ExpectedProjectCreateService', ExpectedProjectCreateService);

    // Inject some dependencies
    ExpectedProjectCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ExpectedProjectCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ExpectedProjectCreateServiceFactory = {
            CreateProject: createProject,
        };

        return ExpectedProjectCreateServiceFactory;

        function createProject(project) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/CreateProject';

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