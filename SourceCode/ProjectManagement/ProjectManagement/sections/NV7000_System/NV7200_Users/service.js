(function () {
    angular.module('app').factory('UserService', UserService);
    UserService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function UserService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var UserServiceFactory = {
            SearchUser: searchUser,
            DeleteUser: deleteUser,
            LockUser: lockUser
        };

        return UserServiceFactory;

        function searchUser(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/SearchUser';
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

        function lockUser(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/LockUser';
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

        function deleteUser(userId) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/user/DeleteUser';
            var deleteObj = {
                UserId: userId
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