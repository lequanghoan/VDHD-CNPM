(function () {
    'use strict';

    angular.module('app').factory('ProfileUpdateService', ProfileUpdateService);

    // Inject some dependencies
    ProfileUpdateService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ProfileUpdateService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ProfileUpdateServiceFactory = {
            //UpdateProfile: UpdateProfile,
            CheckFileExistToUpdate: checkFileExistToUpdate,
            UpdateProfile: updateProfile,
            GetProfileById: getProfileById,
            DownloadProfile: downloadFile
        };

        return ProfileUpdateServiceFactory;

        function getProfileById(profileId) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/GetProfileById';
            var searchObj = {
                ProfileId: profileId
            }
            $http.post(url, JSON.stringify(searchObj), { headers: { 'Content-Type': 'application/json' } })
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

        function downloadFile(profile) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/DownloadProfile';
            $http.post(url, JSON.stringify(profile), { responseType: 'arraybuffer' })
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


        function UpdateProfile(file, profile) {
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

        function checkFileExistToUpdate(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/CheckFileExistToUpdate';
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