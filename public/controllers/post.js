angular.module('aklery')
    .controller('PostCtrl', ['$http', 'Upload', function($http, Upload) {
        var vm = this;

        vm.newPost = {};

        vm.submitForm = function() {
            if (vm.form.file.$valid && vm.file) {
                vm.upload(vm.file);
            }
        };

        // upload on file select or drop
        vm.upload = function(file) {
            Upload.upload({
                url: '/posts/add',
                method: 'POST',
                file: file,
                data: vm.newPost

            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

    }]);