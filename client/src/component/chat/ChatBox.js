import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core/';
import SocketContext from "../../start/SocketContext";
import Axios from "axios";

// import { io } from "socket.io-client";
// const URL = "http://localhost:3001";
// const socket = io(URL);


const useStyles = makeStyles(() => ({
    chatBox: {
        height: '100%',
        backgroundColor: '#EEEEEE',
        position: "relative",
    },
    textInput: {
        position: "absolute",
        bottom: 0,
        color: 'purple',
        width: '100%',
    }

}));
const isEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    } return true;
}

const ChatBox = (props) => {
    const classes = useStyles();

    const socket = React.useContext(SocketContext);
    React.useEffect(() => {
        console.log('effect');
        Axios.post('http://localhost:3001/chat/getConversation', {user1: props.id, user2: props.hisInfos.id})
        .then((res) => {console.log('res', res)}).catch((err) => {console.log('ErR'+err)});
    }, [props.hisInfos])
    React.useEffect(() => {
        console.log('effect');
        Axios.post('http://localhost:3001/chat/getConversation', {user1: props.id, user2: props.hisInfos.id})
        .then((res) => {console.log('res', res)}).catch((err) => {console.log('ErR'+err)});
        // console.log('myInfos', props.id);
    //     if(props.id)
    //     {
    //         socket.emit('join', {id: props.id});
        // }
    }, [])
    // console.log('his', props.hisInfos);
    // socket.on('new_msg', (data) => {
    //     console.log('data', data);
    //     var messages = document.getElementById('messages');
    //     var span = document.createElement('span');
    //     span.innerHTML = data.msg+'</br>';
    //     messages.appendChild(span);
    // })

    const saveMessage = (content) => {
        Axios.post('http://localhost:3001/chat/saveMessage', {from: props.id, to: props.hisInfos.id, content: content})
        .then((res) => {
            console.log(res);
        }).catch((err) => {console.log(err)});
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if(props.hisInfos)
        {
            var input = document.getElementById('msg');
            if(e.keyCode === 13 && input.value)
            {
                console.log('13');
                saveMessage(input.value);
                input.value = '';
                // socket.emit('msg', {text:input.value, to: props.hisInfos.id});
                // var messages = document.getElementById('messages');
                // var span = document.createElement('span');
                // span.innerHTML = 'you : ' + input.value + '</br>';
                // messages.appendChild(span);
                // input.value = '';
            }
        }else {
            console.log('cant find hisInfos')
        }
    }
    // console.log('-props', props.hisInfos)
    if (!isEmpty(props.hisInfos)) {
        return (
            <div className={classes.chatBox}>
                <div id="messages">
                </div>
                <Input id="msg" type="text" className={classes.textInput} placeholder="   ..." onKeyUp={sendMessage}/>
            </div>
        )
    }

    else {
        return (
            <div className={classes.chatBox}>
                <p>select the user you want to chat with</p>
            </div>
        )
    }
}

export default ChatBox;