// import modules
const express = require('express');
const app = express();
const http = require('http').createServer(app); // create a server object
const io = require('socket.io')(http);
const alert = require('alert')

app.use('/views', express.static('views')); //using css template
app.use(express.urlencoded({ extendend: false })); // related to post method
app.set('view-engine', 'ejs')

var users = [];

// load main page
app.get('/', (req, res)=>{
  res.render('index.ejs');
})

app.post('/', (req,res) => {
  username = req.body.username;
  if(users.includes(username)){
    alert('Username already exists');
    res.redirect('/');
  }
  else{
    users.push(username);
    res.redirect('/chat');
  }
  console.log(username);
})

app.get('/chat', (req, res) =>{
  res.render('chat.ejs', {name:username})

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
