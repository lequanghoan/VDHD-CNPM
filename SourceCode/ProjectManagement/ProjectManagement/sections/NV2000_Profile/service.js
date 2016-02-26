(function () {
    angular.module('app').factory('ProfileService', ProfileService);
    ProfileService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ProfileService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ProfileServiceFactory = {
            SearchProfile: searchProfile, //hàm search theo điều kiện tìm kiếm
            DeleteProfile: deleteProfile,
            DownloadProfile: downloadFile,
            GetAllProjectByYear: getAllProjectByYear
        };

        return ProfileServiceFactory;

        function searchProfile(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/SearchProfile';
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

        function getAllProjectByYear(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/GetAllProjectByYear';
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

        function deleteProfile(profile) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/profile/DeleteProfile';
            //var deleteObj = {
            //    profileId: profileId
            //};
            $http.post(url, JSON.stringify(profile), { headers: { 'Content-Type': 'application/json' } })
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