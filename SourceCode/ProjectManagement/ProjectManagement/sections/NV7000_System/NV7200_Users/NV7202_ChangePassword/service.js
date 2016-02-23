// NV7202 Thay đổi mật khẩu
(function () {
    'use strict';

    angular.module('app').factory('NV7202Service', NV7202Service);

    // Inject some dependencies
    NV7202Service.$inject = ['$http', '$q', 'ngAuthSettings', 'localStorageService'];

    function NV7202Service($http, $q, ngAuthSettings, localStorageService) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var NV7202ServiceFactory = {
            ChangePassword: changePassword,
            GetUser: getUser
        };

        return NV7202ServiceFactory;

        function getUser()
        {
            return  localStorageService.get('authorizationData');
        }

        // Thay đổi mật khẩu
        function changePassword(userEntity) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/user/ChangePassword';

            $http.post(url, JSON.stringify(userEntity), { headers: { 'Content-Type': 'application/json' } })
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