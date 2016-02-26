(function () {
    'use strict';

    angular.module('app').factory('ProfileCreateService', ProfileCreateService);

    // Inject some dependencies
    ProfileCreateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ProfileCreateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ProfileCreateServiceFactory = {
            CreateProfile: createProfile,
            CheckFileExist: checkFileExist,
            UpdateProfile: updateProfile
        };

        return ProfileCreateServiceFactory;

        function createProfile(file, profile) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/CreateProfile';
            var fd = new FormData();
            fd.append('file', file);
            fd.append('profile', angular.toJson(profile));
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function (response) {
                deferred.resolve(response);
                return response;
            })
            .error(function () {
                var result = { isSuccess: false, status: statusCode, message: errMessage };
                deferred.reject(result);
                return result;
            });
            return deferred.promise;
        }

        function checkFileExist(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/CheckFileExist';
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

        function updateProfile(file, profile) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/UpdateProfile';
            var fd = new FormData();
            fd.append('file', file);
            fd.append('profile', angular.toJson(profile));
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function (response) {
                deferred.resolve(response);
                return response;
            })
            .error(function () {
                var result = { isSuccess: false, status: statusCode, message: errMessage };
                deferred.reject(result);
                return result;
            });
            return deferred.promise;
        }
    }
})();