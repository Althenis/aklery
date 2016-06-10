angular.module('aklery')
    .controller('PostCtrl', ['$http', function($http) {
        var vm = this;
        
        vm.newPost = {};
        
        vm.submitForm = function() {
            console.log('submit form');
            $http.post('/posts/add',vm.newPost);
        };
        
        
    }]);