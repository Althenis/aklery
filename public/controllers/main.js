'use strict';

angular.module('aklery')
.controller('MainCtrl', ['$http', function($http) {
    var vm = this;
    vm.postContent = {};
       
    vm.getRandomImage = function() {
        $http.get('/posts').success(function(data) {
            vm.postContent = data[0];
        });
    };
    
    vm.getRandomImage();
    
}]);