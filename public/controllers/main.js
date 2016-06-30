'use strict';

angular.module('aklery')
.controller('MainCtrl', ['$http', 'History', function($http, History) {
    var vm = this;
    vm.postContent = {};
    vm.comment = {};
    vm.history = History.getHistory();


    vm.getImage = function(id) {
        $http.get('/posts/post/' + id).success(function(data) {
            vm.postContent = data
        });
    };

    vm.getRandomImage = function() {
        $http.get('/posts').success(function(data) {
            vm.postContent = data[0];
            History.writeHistory({
                title:data[0].title, 
                _id: data[0]._id
            });
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