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
        vm.postContent.comments.push(vm.comment);
        $http.post('/comments/add',vm.comment).then(function() {
            console.log('ok');
        }, function() {
            console.log('err');
        });
    };    
}]).filter('commentDate', function($filter) {
    return function(input) {
        var postDate = moment(input);
        var currentDate = moment();
        return postDate.from(currentDate);
    };
});