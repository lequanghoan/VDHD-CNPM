(function () {
    'use strict';

    angular.module('app').factory('UserUpdateService', UserUpdateService);

    // Inject some dependencies
    UserUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function UserUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var UserUpdateServiceFactory = {
            UpdateUser: updateUser,
            GetUserById: getUserById,
            GetDataCombobox: getDataCombobox,
        };

        return UserUpdateServiceFactory;

        function updateUser(User) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/UpdateUser';

            $http.post(url, JSON.stringify(User), { headers: { 'Content-Type': 'application/json' } })
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
        function getUserById(user) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/GetUserById';

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