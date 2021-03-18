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

var i = 0;

// console.log('----', ta.ago(new Date()));

const isConnected = (string) => {
    var splited = [];
    splited = string.split(',');
    return (splited[0] == "true") ? true : false;
}

const timeAgo = (string) => {
    i++;
    console.log('i', i);
    var splited = [];
    splited = string.split(',');
    var lastConection = new Date(splited[1]);
    var lConnectionSeconds = lastConection.getTime();
    var test = new Date('Thu Mar 18 2020 00:11:16 GMT+0100 (Central European Standard Time)').getTime();
    console.log('asdsad', test);
    return ta.ago(lastConection);


}
// we have to fetch for connected user Email To create a room and join the user to it!

io.sockets.on('connection', (socket) => {
    socket.on('join', (data) => {

        socket.join(data.key);
        console.log(data.key, socket.id);
        if (data.key && socket.id) {
            client.hmset(data.key, { id: data.key, socketId: socket.id, connection: 'true,' + new Date() });
            // client.set(data.key+'-'+(new Date()).getTime() / 1000, socket.id);
            client.keys('*', (err, keys) => {
                if (err)
                    return console.log(err);
                for (var i = 0, len = keys.length; i < len; i++) {
                    // console.log('-', keys[i]);
                    client.hgetall(keys[i], function (err, obj) {
                        console.dir(obj);
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

    socket.on('check_connection', (data) => {

        console.log('........zZZZZzzzZZZZz.....', data);


        client.keys('*', (err, keys) => {
            if (err)
            return console.log(err);
            // maps
            var found = 0;
            for (var i = 0, len = keys.length; i < len; i++) {
                console.log('+++', keys[i], data.visitedId);
                if(keys[i] == data.visitedId)
                {
                    found = 1;
                    client.hgetall(keys[i], function (err, obj) {
                        // if(keys[i] == data.visitedId)
                        // {
                            if(isConnected(obj.connection) == false)
                            {
                                var TimeAgo = timeAgo(obj.connection);
                                console.log('~~~~', TimeAgo);
                                io.emit('receive_connection', { visitor: data.visitorId, connection: false, timeAgo: `connected ${TimeAgo}` });
                            }
                            else {
                                io.emit('receive_connection', { visitor: data.visitorId, connection: true, timeAgo: 'connected now' });
                                console.log('ONLINE');
                            }
                            // }
                        });
                }
            }
            if(found == 0)
            {
                io.emit('receive_connection', { visitor: data.visitorId, connection: false, timeAgo: 'never been connected' });
                                console.log('not FOUND');
            }
        });
    });

    socket.on('Firedisconnect', (data) => {
        if (data.id && socket.id) {
            client.hmset(data.id, { connection: 'false,' + new Date() });
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