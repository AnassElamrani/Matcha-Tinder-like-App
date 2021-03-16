const bodyParser = require("body-parser")
const userRoutes = require("./routes/user")
const errRoutes = require("./routes/error")
const homeRoutes = require('./routes/base')
const chatRoutes = require('./routes/chat');
const notificationsRoute = Routes = require('./routes/Notifications');
const browsingRoutes = require('./routes/browsing')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth")
const pss = require('./util/passport.js')
const passport = require('passport')
const cors = require("cors")
const express = require('express')
const {client , redis } = require('./util/redisModule');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
}}
);

// we have to fetch for connected user Email To create a room and join the user to it!

io.sockets.on('connection', (socket) => {
    socket.on('join', (data) => {

        socket.join(data.key);
        console.log(data.key , socket.id);
    })
    socket.on('msg', (data) => {
        console.log('data', data);
        socket.to(data.to).emit('new_msg', {msg: data.text, from: data.from, to: data.to}); 
    })
    socket.on('new_like', (data) => {
        console.log('******', data);
        socket.to(data.idLiked).emit('receive_like', {who : data.idLiker, target: data.idLiked}); 
    });

    socket.on('new_visit', (data) => {
        console.log('visit', data);
        socket.to(data.idVisited).emit('receive_visit', {who : data.idVisiter, target: data.idVisited}); 
    });

    socket.on('new_dislike', (data) => {
        console.log('dislike', data);
        socket.to(data.idDisliked).emit('receive_dislike', {who : data.idDisliker, target: data.idDisliked}); 
    });
    
    socket.on('disconnect', () => {
        console.log('disconnect');
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

client.on("error", (error) => {
    console.log('error', error);
})


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
app.use('/notifications', notificationsRoute);

http.listen(3001)