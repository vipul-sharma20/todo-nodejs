var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
        user_id    : String,
        content    : String,
        updated_at : Date,
        place      : String,
        event_at   : Date,
        closed     : { type: Boolean, default: false }
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/express-todo' );
