// import modules
const express = require('express');
const app = express();
const http = require('http').createServer(app); // create a server object
const io = require('socket.io')(http);
const alert = require('alert')

app.use('/views', express.static('views')); //using css template
app.use(express.urlencoded({ extendend: false })); // related to post method
app.set('view-engine', 'ejs')

const users = {};
var valido = true;
var username = 'indefinido';

// render chat page
app.get('/chat', (req, res) =>{
  res.render('chat.ejs')
})

// load main page
app.get('/', (req, res)=>{
  res.render('index.ejs');
})

// send post request and get username information
app.post('/', (req,res) => {
  username = req.body.username;
  if(Object.values(users).includes(username)){
    alert('Username already exists');
    valido = false
    res.redirect('/');
  }
  else{
    valido = true;
    res.redirect('/chat');
  }
})

// user connection
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', users[socket.id] + ': ' + msg);
  })
  console.log(`a user is connected with id: ${socket.id}`);
  users[socket.id] = username;
})

http.listen(3000);
