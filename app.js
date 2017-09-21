var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();
//setup template engine
app.set('view engine','ejs');

//static files
//  app.use('/assets', express.static('assets'));
// app.use('/assets', express.static('./public'));
app.use(express.static('./public'));
//fire controllers
todoController(app);


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

console.log('You are listing to port ' + port);
console.log('You are listing to ip   ' + ip );
//listen to port
app.listen(port, ip);
console.log('You are listing to port 3000');
