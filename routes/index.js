
/*
 * GET home page.
 */

var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

exports.index = function(req, res){
  res.render('index', { title: 'TODO app' });
};

exports.create = function ( req, res ){
  new Todo({
    content    : req.body.content,
    updated_at : Date.now(),
    place      : req.body.place
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
};

// query db for all todo items
exports.index = function ( req, res ){
  Todo.find( function ( err, todos, count ){
    res.render( 'index', {
      title : 'Todo',
      todos : todos
    });
  });
};

// remove todo item by its id
exports.destroy = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });
};

// redirect to index when finish
exports.update = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
};

// edit item
exports.edit = function ( req, res ){
  Todo.find( function ( err, todos ){
    res.render( 'index', {
        title   : 'Todo',
        todos   : todos,
        current : req.params.id
    });
  });
};