
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
    place      : req.body.place,
    event_at   : req.body.event_at
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
exports.close = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    closed = !todo.closed;
    todo.update( {closed:closed}, function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
};

// redirect to index when finish
exports.update = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.place = req.body.place;
    var temp = req.body.event_at;
    //var event_at = new Date(temp);
    todo.event_at = temp;
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
};

// snooze by 1 day
exports.snooze = function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    updated_at = Date.now();
    event_at = todo.event_at.setDate(todo.event_at.getDate()+1);
    todo.update( {event_at:event_at, udpated_at:updated_at }, function ( err, todo, count ){
      res.redirect( '/' );
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