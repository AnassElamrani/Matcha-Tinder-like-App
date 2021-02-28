import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core/';

import { io } from "socket.io-client";
const URL = "http://localhost:3001";
const socket = io(URL);



socket.on('new_msg', (data) => {
    var messages = document.getElementById('messages');
    var span = document.createElement('span');
    span.innerHTML = data+'</br>';
    messages.appendChild(span);
    // alert(data);
})

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
    
    const ChatBox = (props) => {
        
        socket.on('connect', () => {
            socket.emit('myRoom', props.myInfos.email);
        })
        if(props.hisInfos)
        {
            console.log('his', props.hisInfos.email);
        }

        // console.log('name:',props.name );

        const classes = useStyles();

        const sendMessage = (e) => {
            e.preventDefault();
            if(props.hisInfos)
            {

                var input = document.getElementById('msg');
                if(e.keyCode === 13)
                {
                    socket.emit('msg', {text:input.value, to: props.hisInfos.email});
                    input.value = '';
                    
                }
            }else {
                console.log('cant find hisInfos')
            }
        }
    return(
        <div className={classes.chatBox}>
        <div id="messages">
        </div>
        <Input id="msg" type="text"  className={classes.textInput} placeholder="Message Goes Here" onKeyUp={sendMessage} />
        </div>
    )
}

export default ChatBox;