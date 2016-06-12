'use strict';

angular.module('aklery')
.controller('MainCtrl', ['$http', function($http) {
    var vm = this;
    vm.postContent = {};
    vm.comment = {};
       
    vm.getRandomImage = function() {
        $http.get('/posts').success(function(data) {
            vm.postContent = data[0];
        });
    };    
    vm.getRandomImage();
    
    vm.addComment = function() {
        console.log("id: " + vm.postContent._id + " user: " + vm.comment.username + " comment: " + vm.comment.comment);
        vm.comment.id = vm.postContent._id;
        $http.post('/comments/add',vm.comment).then(function() {
            console.log('ok');
        }, function() {
            console.log('err');
        });
    };
    
}]);