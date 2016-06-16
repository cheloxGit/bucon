(function(){
var ang_app = angular.module('buconAngular', ['trNgGrid']);

ang_app.controller('MainController', function($scope, $http){
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/projects')
        .success(function(data) {
            $scope.projects = data;
            // console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // $http.get('/api/deptosPrice')
    //     .success(function (data){
    //         $scope.deptos = data;
    //         // console.log(data);
    //     })
    //     .error(function(data){
    //         console.log('Error:' + data);
    //     });

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

ang_app.factory('DataService',  function ($http, $q) {

    function DataService(){
        var self = this;

        self.depto = null;
        // self.name = 'Vaticano';
        self.getDepto = function(name_project){

            var deferred = $q.defer();
            // var promise = defered.promise;
            if (self.depto !== null){
                deferred.resolve(self.depto);
            }else{
                $http.get('/api/getDeptos/' + name_project)
                        .success(function (response){
                            self.depto = response.deptos;
                            // console.log('response http get JSOn:');
                            // console.log(JSON.stringify(response));
                            deferred.resolve(response);
                // console.log('scope.deptos:');
                // console.log($scope.deptos); 
                })
                        .error(function(response){
                            deferred.reject(response);
                            console.log('Error:' + response);
                });
            }
            return deferred.promise;
        };
    }

    return new DataService();
});

ang_app.controller('TabController', ['$scope', '$http', 'DataService', function($scope, $http, DataService){
    $scope.formData = {};

    this.tab = 1;
    this.items = null;
    this.setTab = function(newVal){
        this.tab = newVal;
    };


    // if (this.tab == '2'){
            // alert('Ohhh');
    this.getDeptos = function(name){
        alert('Hoooo:' + name);
        this.tab = 2;
        // this.items = {};
        $scope.deptos = {};

        DataService.getDepto(name)
            .then(
                    function(data){
                        console.log('Depto in controller Tab:');
                        // console.log(data);
                        $scope.deptos  = data;

                    },
                    function(result){
                        console.log("Failed, result is:"+result);
                    });

        // $http.get('/api/getDeptos/' + name)
        //     .success(function (data){
        //         $scope.deptos = JSON.stringify([{"_id":"575eddd75f186717dc19eae9","name":"Guadalupe","depto":"Planta Baja 1A","sales_price":"0"},{"_id":"575eddd75f186717dc19eaea","name":"Guadalupe","depto":"Planta Baja 2B","sales_price":"0"}]);
        //         console.log('scope.deptos:');
        //         console.log($scope.deptos); 
        //     })
        //     .error(function(data){
        //             console.log('Error:' + data);
        //     });
        // this.fields = ['name','depto','precio_venta'];
        // console.log('scope.deptos out of get:');
        // console.log(this.items); 
        // this.items = $scope.deptos;
// [{"_id":"575eddd75f186717dc19eae9","name":"Guadalupe","depto":"Planta Baja 1A","sales_price":"0"},{"_id":"575eddd75f186717dc19eaea","name":"Guadalupe","depto":"Planta Baja 2B","sales_price":"0"}];
        // this.items = $scope.deptos;
//         [
//   {
//     "_id": "575eddd75f186717dc19eae5",
//     "name": "Vaticano",
//     "depto": "1A",
//     "sales_price": "0"
//   },
//   {
//     "_id": "575eddd75f186717dc19eae6",
//     "name": "Vaticano",
//     "depto": "1B",
//     "sales_price": "0"
//   },
//   {
//     "_id": "575eddd75f186717dc19eae7",
//     "name": "Vaticano",
//     "depto": "2A",
//     "sales_price": "0"
//   },
//   {
//     "_id": "575eddd75f186717dc19eae8",
//     "name": "Vaticano",  
//     "depto": "2B",
//     "sales_price": "0"
//   }
// ];
        // for(var i = 1; i <= 10; i ++) {
        //     this.items.push({
        //                       'name':i, 
        //                       'depto': i+" street", 
        //                       'precio_venta':'<img src="http://placehold.it/50x50"/>'
        //                     });
        // }
        // console.log(this.items);
    // this.items = [{"_id":"575eddd75f186717dc19eae5","name":"Vaticano","depto":"1A","sales_price":"0"},{"_id":"575eddd75f186717dc19eae6","name":"Vaticano","depto":"1B","sales_price":"0"},{"_id":"575eddd75f186717dc19eae7","name":"Vaticano","depto":"2A","sales_price":"0"},{"_id":"575eddd75f186717dc19eae8","name":"Vaticano","depto":"2B","sales_price":"0"}];
    // console.log('$scope.deptos :');
    // console.log($scope.deptos);
    
    };
    // }

    this.isSet = function(tabName){
        return this.tab === tabName;
    };
}]);

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