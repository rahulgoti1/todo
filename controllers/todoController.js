var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test@ds141454.mlab.com:41454/rahul_todo');

//Create schema - this is like blueprint
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item : 'Get Flowers'}).save( function (err){
//   if(err){
//       throw err;
//   }
//   console.log('item saved');
// });


// var data = [{item : 'get rahul'}, {item: 'walk on fire'}, {item : 'Java is best'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app){
    app.get('/todo', function (req, res) {
      //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){
          if(err) throw err;
          res.render('todo', { todos : data});
        });
        // res.render('todo', { todos : data});
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from view and added to mongodb
        var newTodo  = Todo(req.body).save(function(err, data){
          if(err) throw err;
          res.json(data);
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', function (req, res) {
      //delete requested item from mongodb
      Todo.find({item : req.params.item.replace(/\-/g, ' ') }).remove(function(err, data){
          if(err) throw err;
          res.json(data);
      });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item;
        // });
        // res.json(data);
    });
};
