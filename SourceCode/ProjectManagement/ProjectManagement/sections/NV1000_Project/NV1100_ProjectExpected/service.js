(function () {
    angular.module('app').factory('ExpectedProjectService', ExpectedProjectService);
    ExpectedProjectService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function ExpectedProjectService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var ExpectedProjectServiceFactory = {
            SearchProject: searchProject, //hàm search theo điều kiện tìm kiếm
            GetAllDepartment: getAllDepartment,
            ApproveProject: approveProject,
            ChangeDept: changeDept,
            DeleteProject: deleteProject,
            CheckConstrain: checkConstrain
        };

        return ExpectedProjectServiceFactory;

        function checkConstrain(projectId) {
            var deferred = $q.defer();
            var obj = {
                ProjectId: projectId
            }
            var url = serviceBase + 'api/prepareProject/CheckConstrain';
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

        function searchProject(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/SearchProject';
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

        function getAllDepartment() {
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

        function approveProject(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/ApproveProject';
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

        function changeDept(obj) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/ChangeDept';
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

        function deleteProject(projectId) {

            var deferred = $q.defer();
            var url = serviceBase + 'api/prepareProject/DeleteProject';
            var deleteObj = {
                ProjectId: projectId
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