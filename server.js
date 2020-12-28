// import modules
const express = require('express');
const app = express();
const http = require('http').createServer(app); // create a server object
const io = require('socket.io')(http);

app.use('/public', express.static('public')); //using css template

// load main page
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

// user connection
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
    console.log('message: ' + msg);
  })
  console.log(`a user is connected with id: ${socket.id}`);
})

http.listen(3000);
