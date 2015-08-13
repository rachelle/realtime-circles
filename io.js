// calling the function then requiring the socketio. from the www file. 
// our server side object of socket.io
var io = require('socket.io')();

// callback function
io.on('connection', function(socket) {
  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });
// socket if you find an add-circle event execute that data
  socket.on('clear-display', function() {
// then emit the add circle event with the data
  io.emit('clear-display');
  });
});




// able to have io to be attached to the server. 
module.exports = io; 

