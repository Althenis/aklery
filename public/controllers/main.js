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
        if(vm.comment.username && vm.comment.comment) {
            console.log("Comment");
            vm.comment.id = vm.postContent._id;
            vm.postContent.comments.push(vm.comment);
            $http.post('/comments/add',vm.comment).then(function() {
                console.log('ok');
            }, function() {
                console.log('err');
            });
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