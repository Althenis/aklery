'use strict';

angular.module('aklery')
.controller('MainCtrl', ['$http', function($http) {
    var vm = this;
    vm.postContent = {};
    var posts = [];
    // $http.get('posts.json').success(function(data) {
    //     posts = data;
    //     vm.getRandomImage();
    // });
       
    vm.getRandomImage = function() {
        var index = Math.floor(Math.random() * posts.length);
        vm.postContent = posts[index];
    };
    
    vm.getAllPosts = function() {
        $http.get('/posts').success(function(data) {
            console.log(data);
            posts = data;
        });
    };
    
    vm.getAllPosts();
    
}]);