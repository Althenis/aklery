angular.module('aklery', ['ui.router','ngFileUpload','ngStorage'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
        enabled: true
    });
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .state('newpost', {
            url: '/posts/add',
            templateUrl: 'views/new-post.html',
            controller: 'PostCtrl',
            controllerAs: 'post'
        });
});