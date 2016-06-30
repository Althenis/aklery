angular
    .module('aklery')
    .factory('History', ['$localStorage', function($localStorage) {

        $localStorage.history = $localStorage.history || [];
          
        var service = {};
        
        service.getHistory = function() {
            return $localStorage.history;
        };
        
        service.writeHistory = function(image) {
            $localStorage.history.push(image);
        };
        
        service.deleteHistory = function() {
            $localStorage.history = [];
        };
        
        return service;
    }]);