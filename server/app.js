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
    console.log('a user connected')
    socket.on('join', (data) => {
        socket.join(data.id);
        // console.log(data.id , socket.id);
    })
    socket.on('msg', (data) => {
        io.sockets.in(data.to).emit('new_msg', {msg: data.text});
    })
    socket.on('disconnect', () => {
        console.log('disconnect');
    })
    socket.on('inResponsive', (id) => {
        console.log(id, socket.id);
        client.set(id, socket.id, redis.print);
        client.set(id+'time', 'timeX', redis.print);
        client.keys('*', function (err, keys) {
            if (err) return console.log(err);
            for(var i = 0, len = keys.length; i < len; i++) {
              console.log(keys[i]);
            }
          }); 
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

client.on("error", (error) => {
    console.log('error', error);
})

// client.set("2", "000000", redis.print);
// client.get("2", redis.print);

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