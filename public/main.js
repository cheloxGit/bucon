(function(){
var ang_app = angular.module('buconAngular', []);

ang_app.controller('MainController', function($scope, $http){
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/projects')
        .success(function(data) {
            $scope.projects = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/deptosPrice')
        .success(function (data){
            $scope.deptos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error:' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createProject = function(){
        $http.post('/api/projects', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteProject = function(id) {
        $http.delete('/api/projects/' + id)
            .success(function(data) {
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };


});

ang_app.controller('TabController', function($scope, $http){
    $scope.formData = {};

    this.tab = 1;

    this.setTab = function(newVal){
        this.tab = newVal;
    };


    // if (this.tab == '2'){
            // alert('Ohhh');
    this.getDeptos = function(name){
        alert('Hoooo:' + name);
        this.tab = 2;
        // $scope.deptos = {};
        $http.get('/api/getDeptos/' + name)
            .success(function (data){
                $scope.deptos = data;
                console.log(data);
            })
            .error(function(data){
                    console.log('Error:' + data);
            });
    };
    // }

    this.isSet = function(tabName){
        return this.tab === tabName;
    };
});

// ang_app.controller('DeptosPrice', function($scope, $http){
//     $http.get('/api/deptosPrice').
//     then(function (response) {
//         $scope.deptos = response.data;
//     });
// });
/*
function mainController($scope, $http) {  
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/projects')
        .success(function(data) {
            $scope.projects = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createProject = function(){
        $http.post('/api/projects', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteProject = function(id) {
        $http.delete('/api/projects/' + id)
            .success(function(data) {
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}*/
})();