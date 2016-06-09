angular.module('aklery')
.controller('MainCtrl', ['$http', function($http) {
    var vm = this;
    
    return vm;
}]);


// .controller('ArticlesCtrl', ['$scope','$http', function($scope,$http) {
//    $http.get('/articles').success(function(data) {
//       $scope.articles = data;
//    });
// }])