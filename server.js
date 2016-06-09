//server.js

var express     = require('express');  
var app         = express();  
var mongoose     = require('mongoose');

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/bucon_db');

// Configuración
app.configure(function() {  
    // Localización de los ficheros estÃ¡ticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());                  
});

// Definición de modelos
var bucon_m= mongoose.model('bucon_m', {  
    name_project: String
});

// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/projects', function(req, res) {  
    bucon_m.find(function(err, projects) {
        if(err) {
            res.send(err);
        }
        res.json(projects);
    });
});

// POST que crea un TODO y devuelve todos tras la creación
app.post('/api/projects', function(req, res) {  
    bucon_m.create({
        name_project: req.body.text,
        done: false
    }, function(err, project){
        if(err) {
            res.send(err);
        }

        bucon_m.find(function(err, projects) {
            if(err){
                res.send(err);
            }
            res.json(projects);
        });
    });
});

// DELETE un TODO específico y devuelve todos tras borrarlo.
app.delete('/api/projects/:project', function(req, res) {  
    bucon_m.remove({
        _id: req.params.project
    }, function(err, project) {
        if(err){
            res.send(err);
        }

        bucon_m.find(function(err, projects) {
            if(err){
                res.send(err);
            }
            res.json(projects);
        });

    })
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {  
    console.log('App listening on port 8080');
});