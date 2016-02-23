(function () {
    'use strict';

    angular.module('app').factory('UserCreateService', UserCreateService);

    // Inject some dependencies
    UserCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function UserCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var UserCreateServiceFactory = {
            CreateUser: createUser,
            GetDataCombobox: getDataCombobox,
        };

        return UserCreateServiceFactory;

        function createUser(user) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/CreateUser';

            $http.post(url, JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } })
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
        function getDataCombobox() {
            var deferred = $q.defer();
            var url = serviceBase + 'api/department/GetAllDept';
            $http.post(url, { headers: { 'Content-Type': 'application/json' } })
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