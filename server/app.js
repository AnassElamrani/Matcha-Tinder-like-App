const bodyParser = require("body-parser")
const userRoutes = require("./routes/user")
const errRoutes = require("./routes/error")
const homeRoutes = require('./routes/base')
const chatRoutes = require('./routes/chat');
const browsingRoutes = require('./routes/browsing')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth")
const pss = require('./util/passport.js')
const passport = require('passport')
const cors = require("cors")
const express = require('express')

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
}}
);
// we have to fetch for connected user Email To create a room and join the user to it!

var room = '';

io.on('connection', (socket) => {
    socket.on('myRoom', (email) => {
        room = email;
        console.log('room', room);
    })
    socket.join(room);
    // console.log('socket.id', socket.id)
    console.log('a user connected')
    socket.on('msg', (data) => {
      room = data.to;
      console.log('data :', data);
      socket.join(room);
    //   io.emit('chat-msg', {message:msg, Id: socket.id})
    io.in(room).emit('new_msg', data.text);
    })
})

app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());

//bodyParser
//extended: false
app.use(bodyParser.urlencoded({extended: true}));

// Images ***************************************************
// need help of package path
const path = require('path');
// static folder to thing like image ...
app.use(express.static(path.join(__dirname, 'public/upload')));
// console.log(express.static(path.join(__dirname, 'public'))
//**********************************************************

// parse application/json
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(authRoutes)
app.use(homeRoutes)
app.use(browsingRoutes)
app.use(userRoutes)
app.use(errRoutes)
app.use('/chat', chatRoutes);

http.listen(3001)