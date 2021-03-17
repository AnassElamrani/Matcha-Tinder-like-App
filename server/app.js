var ta = require('./timeago.js')


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
const { client, redis } = require('./util/redisModule');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}
);

// console.log('----', ta.ago(new Date()));


// we have to fetch for connected user Email To create a room and join the user to it!
var users = [];
var Exist = 0;

io.sockets.on('connection', (socket) => {
    socket.on('join', (data) => {

        socket.join(data.key);
        console.log(data.key, socket.id);
        if (data.key && socket.id) {
            client.hmset(`user${data.key}`, { id: data.key, socketId: socket.id, connected_at: new Date() });
            // client.set(data.key+'-'+(new Date()).getTime() / 1000, socket.id);
            client.keys('*', (err, keys) => {
                if (err)
                    return console.log(err);
                for (var i = 0, len = keys.length; i < len; i++) {
                    // console.log('-', keys[i]);
                    client.hgetall(keys[i], function (err, obj) {
                        // console.log('*',obj);
                    });
                }
            });
        }
    })
    socket.on('msg', (data) => {
        console.log('data', data);
        socket.to(data.to).emit('new_msg', { msg: data.text, from: data.from, to: data.to });
    })
    socket.on('new_like', (data) => {
        console.log('******', data);
        socket.to(data.target).emit('receive_like', { who: data.who, target: data.target });
    });

    socket.on('new_visit', (data) => {
        console.log('visit', data);
        socket.to(data.target).emit('receive_visit', { who: data.who, target: data.target });
    });

    socket.on('new_dislike', (data) => {
        console.log('dislike', data);
        socket.to(data.target).emit('receive_dislike', { who: data.who, target: data.target });

    });
    socket.on('get_users', (data) => {
        client.keys('*', (err, keys) => {
            if (err)
                return console.log(err);
            for (var i = 0, len = keys.length; i < len; i++) {
                client.hgetall(keys[i], function (err, obj) {
                    // users.push(obj);
                    users.push(obj);
                    console.log('*', obj);
                });
            }
        });
        // console.log('*', userHasconnection, connectionDate , disconnectionDate);

    });

    socket.on('get_time', (data) => {
        if (users.length != 0) {
            users.map((el) => {
                if (el.id == data.target) {
                    Exist = 1;
                    console.log('-')
                    if (el.hasOwnProperty('disconnect_at')) {
                        var connected_at = new Date(el.connected_at);
                        var disconnect_at = new Date(el.disconnect_at);
                        var diff = Math.abs(disconnect_at - connected_at);
                        // console.log('00', connected_at , disconnect_at, diff);
                        console.log('diff', diff);
                        var timeago = ta.ago(Date.now() - diff);
                        socket.emit('connection_time', { status: 'idk', time: timeago });
                    } else {
                        // connected
                        socket.emit('connection_time', { status: 'connected', time: 'now' });
                    }
                }
            });
            if (Exist == 0)
                socket.emit('connection_time', { status: 'offline', time: 'offline' });
        }
    })
    socket.on('Firedisconnect', (data) => {
        if (data.id && socket.id) {
            client.hmset(`user${data.id}`, { disconnect_at: new Date() });

            client.keys('*', (err, keys) => {
                if (err)
                    return console.log(err);
                // for(var i = 0, len = keys.length; i < len; i++){
                //     client.hmset(`user${data.id}`, {id : data.id, status : "disconnected", socketId: socket.id, time: ta.ago(new Date() - seconds)});
                // }
            });

            client.keys('*', (err, keys) => {
                if (err)
                    return console.log(err);
                for (var i = 0, len = keys.length; i < len; i++) {
                    client.hgetall(keys[i], function (err, obj) {
                        console.dir(obj);
                    });
                }
            });
        }

        console.log('disconnect', data);
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
app.use(bodyParser.urlencoded({ extended: true }));

client.on("error", (error) => {
    console.log('error', error);
})


// Images ***************************************************
// need help of package path
const path = require('path');
const { disconnect } = require("process");
const timeago = require('./timeago.js')
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