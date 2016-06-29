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
        // Only add comment if form is valid
        if(vm.commentForm.$valid) {
            
            // get id of the post, so comments can be linked
            vm.comment.id = vm.postContent._id;
            
            // Display comment in view immediately
            vm.postContent.comments.push(vm.comment);
            
            $http.post('/comments/add',vm.comment).then(function() {
                console.log('ok');
            }, function() {
                console.log('err');
            });
            // clear the form
            vm.commentForm.$setPristine();
            vm.commentForm.$setUntouched();
            vm.comment = {};
        }
                
    };    
}]).filter('commentDate', function($filter) {
    return function(input) {
        var postDate = moment(input);
        var currentDate = moment();
        return postDate.from(currentDate);
    };
});