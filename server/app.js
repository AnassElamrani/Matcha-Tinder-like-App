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


var users = {};
io.on('connection', (socket) => {
    console.log('connected');
    socket.emit('askForUserEmail');
    socket.on('sendUserEmail', (userId) => {
        console.log('******')
        users[userId] = socket.id;
        console.log('user', users);
    })
    socket.on('new-msg', (data) => {
        const receiverId = users[data.to];
        const message = data.text;
        const from = data.from;
        console.log('to', data.to, receiverId);
        socket.broadcast.to(receiverId).emit('send', {message: message, from: from});
    });
        

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
const { disconnect } = require("process");
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