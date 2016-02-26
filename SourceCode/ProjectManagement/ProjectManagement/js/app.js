'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngAnimate',
//    'ngCookies',
//    'ngResource',
    'ngSanitize',
    'ngTouch',
//    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'perfect_scrollbar',
    'angular-inview',
    'angular-loading-bar',
    'LocalStorageModule'
]);


'use strict';

/**
 * Config for the router
 */
var app = angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('/login');
                $stateProvider
                   .state('login', {
                       templateUrl: 'sections/authentication/login/login.html',
                       url: '/login',
                       controller: 'loginController',
                       data: { requireLogin: false },
                       resolve: {

                           deps: ['$ocLazyLoad',
                           function ($ocLazyLoad) {
                               return $ocLazyLoad.load([
                                   'sections/authentication/login/loginController.js'
                               ]);
                           }
                           ]
                       }
                   })
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'partials/app.html',
                        data: { requireLogin: true },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('cgNotify').then(
                                        function () {
                                            return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                        });
                                }
                            ]
                        }
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'partials/app_dashboard.html',
                        
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                            function () {
                                                return $ocLazyLoad.load('js/controllers/dashboard.js');
                                            }
                                        )
                                        .then(
                                          function () {
                                              return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                          }
                                          )
                                        .then(
                                              function () {
                                                  return $ocLazyLoad.load('cgNotify');
                                              }
                                          )
                                    ;
                                }
                            ]
                        }
                    })
                    .state('app.widgets', {
                        url: '/widgets',
                        templateUrl: 'partials/widgets.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js',
                                        'js/controllers/vectormap.js',
                                        'js/directives/ui-todowidget.js',
                                        'js/controllers/messages-widget.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.searchapp', {
                        url: '/searchapp',
                        templateUrl: 'partials/searchapp.html',
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class=""></div>'
                    })
                    .state('access.login', {
                        url: '/login',
                        templateUrl: 'partials/ui-login.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/login.js',
                                        '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('access.register', {
                        url: '/register',
                        templateUrl: 'partials/ui-register.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/register.js', '../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'partials/ui-forgotpwd.html',
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'partials/ui-404.html',
                    })
                    .state('access.500', {
                        url: '/500',
                        templateUrl: 'partials/ui-500.html'
                    })
                    .state('access.lockscreen', {
                        url: '/lockscreen',
                        templateUrl: 'partials/ui-lockscreen.html'
                    })
                .state('app.misson-continue', {
                    url: '/nhiem-vu-dang-thuc-hien',
                    templateUrl: 'sections/NV1000_Project/NV1200_ProjectOngoing/view.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'bower_components/font-awesome/css/font-awesome.css',
                                    'sections/NV1000_Project/NV1200_ProjectOngoing/service.js',
                                    'sections/NV1000_Project/NV1200_ProjectOngoing/controller.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.list-money', {
                    url: '/kinh-phi',
                    templateUrl: 'sections/NV5000_FundsFor/view.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'bower_components/font-awesome/css/font-awesome.css',
                                    'sections/NV5000_FundsFor/controller.js',
                                    'sections/NV5000_FundsFor/service.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.authorize', {
                    url: '/phan-quyen',
                    templateUrl: 'sections/NV3000_Permission/view.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'bower_components/font-awesome/css/font-awesome.css',
                                    'sections/NV3000_Permission/controller.js',
                                    'sections/NV3000_Permission/service.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.nhiem-vu-du-kien', {
                    url: '/nhiem-vu-du-kien',
                    templateUrl: 'sections/NV1000_Project/NV1100_ProjectExpected/view.html',
                    controller: 'ProjectExpectedCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV1000_Project/NV1100_ProjectExpected/controller.js',
                                    'sections/NV1000_Project/NV1100_ProjectExpected/service.js'
                                ]).then(
                                    function () {
                                        return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.tien-do', {
                    url: '/tien-do',
                    templateUrl: 'sections/NV4000_Schedule/view.html',
                    controller: 'ScheduleCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV4000_Schedule/controller.js',
                                    'sections/NV4000_Schedule/service.js'
                                ]);
                            }
                        ], items: function () {
                            return { projectId: "" };
                        }
                    }
                })
                .state('app.ho-so', {
                    url: '/ho-so',
                    templateUrl: 'sections/NV2000_Profile/view.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV2000_Profile/controller.js',
                                    'sections/NV2000_Profile/service.js',
                                    'js/FileSaver.js'
                                ]);
                            }
                        ], items: function () {
                            return { profileId: "" };
                        }
                    }
                })
                .state('app.nhiem-vu-da-ket-thuc', {
                    url: '/nhiem-vu-da-ket-thuc',
                    templateUrl: 'sections/NV1000_Project/NV1300_ProjectComplete/view.html',
                    controller: 'ProjectCompleteCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV1000_Project/NV1300_ProjectComplete/controller.js',
                                    'sections/NV1000_Project/NV1300_ProjectComplete/service.js',
                                    'js/FileSaver.js'
                                ]).then(
                                    function () {
                                        return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.bao-cao-nv-dang-thuc-hien', {
                    url: '/bao-cao',
                    templateUrl: 'sections/bao-cao/nhiem-vu-dang-thuc-hien/view.html',
                    controller: 'BaoCaoNhiemVuDangTHCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/bao-cao/nhiem-vu-dang-thuc-hien/controller.js',
                                    'sections/bao-cao/nhiem-vu-dang-thuc-hien/service.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.department', {
                    url: '/phong-ban',
                    templateUrl: 'sections/NV7000_System/NV7100_Department/view.html',
                    controller: 'DepartmentCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV7000_System/NV7100_Department/controller.js',
                                    'sections/NV7000_System/NV7100_Department/service.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.field', {
                    url: '/linh-vuc',
                    templateUrl: 'sections/NV7000_System/NV7300_Career/view.html',
                    controller: 'CareerCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV7000_System/NV7300_Career/controller.js',
                                    'sections/NV7000_System/NV7300_Career/service.js'
                                ]);
                            }
                        ]
                    }
                })
                .state('app.users', {
                    url: '/can-bo',
                    templateUrl: 'sections/NV7000_System/NV7200_Users/view.html',
                    controller: 'UserCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'sections/NV7000_System/NV7200_Users/controller.js',
                                    'sections/NV7000_System/NV7200_Users/service.js'
                                ]);
                            }
                        ]
                    }
                })
            }
        ]
    );
var serviceBase = "http://localhost:20354/";
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'NTS-QLNV'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run([
    'authService', function (authService) {
        authService.fillAuthData();
    }]);

app.run(['$rootScope', 'authService', '$state', function ($rootScope, authService, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // Do something when $state changed
        if (authService.authentication.isAuth)
            return;

        var requireLogin = toState.data.requireLogin;
        if (requireLogin == 'undefined') {
            requireLogin = false;
        }
        if (requireLogin) {
            event.preventDefault();
            $state.transitionTo('login');
        }
    });
}]);


// Directive cho fileUpload
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        //require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.require = true;
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                    //ngModel.$setViewValue(element.val());
                    //ngModel.$render();
                });

            });
        }
    };
}]);

app.directive('changeFile', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.changeFile);
            element.bind('change', onChangeFunc);
        }
    };
});

app.directive("formatDate", function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, modelCtrl) {
            modelCtrl.$formatters.push(function(modelValue){
                return new Date(modelValue);
            })
        }
    }
})

app.directive('datepickerLocalDate', ['$parse', function ($parse) {
    var directive = {
        restrict: 'A',
        require: ['ngModel'],
        link: link
    };
    return directive;

    function link(scope, element, attr, ctrls) {
        var ngModelController = ctrls[0];

        // called with a JavaScript Date object when picked from the datepicker
        ngModelController.$parsers.push(function (viewValue) {
            // undo the timezone adjustment we did during the formatting

            if (viewValue == null) return null;

            viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());

            // we just want a local date in ISO format
            return viewValue.toISOString().substring(0, 10);
            //return viewValue;
        });

        // called with a 'yyyy-mm-dd' string to format
        ngModelController.$formatters.push(function (modelValue) {
            if (!modelValue) {
                return undefined;
            }
            // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
            var dt = new Date(modelValue);

            // 'undo' the timezone offset again (so we end up on the original date again)          
            dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
            return dt.toISOString().substring(0, 10);
            // return dt.ToddMMyyyy();
        });
    }
}]);

// Validate cho input type file
//app.directive('validFile', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModel) {
//            element.bind('change', function () {
//                scope.$apply(function () {
//                    ngModel.$setViewValue(element.val());
//                    ngModel.$render();
//                });
//            });
//        }
//    }
//});

