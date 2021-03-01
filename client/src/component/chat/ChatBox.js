import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core/';

import { io } from "socket.io-client";
const URL = "http://localhost:3001";
const socket = io(URL);




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
    const classes = useStyles();

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    socket.on('send', (data) => {
        alert(1);
        var messages = document.getElementById('messages');
        var span = document.createElement('span');
        span.innerHTML = data.message+'</br>';
        messages.appendChild(span);
    })


    //// 1 ////////

    React.useEffect(() => {
        // if(!isEmpty(props.myInfos))
        // {
                    socket.on('askForUserEmail', () => {
                        console.log(socket.id)
                        socket.emit('sendUserEmail', props.myInfos.email);
                    });
        // }
    })
    

    const sendMessage = (e) => {
        e.preventDefault();
        if(!isEmpty(props.hisInfos))
        {
            var input = document.getElementById('msg');
            if(e.keyCode === 13)
            {
                socket.emit('new-msg', 
                {text : input.value, from : props.hisInfos.email , to: props.hisInfos.email}
                );
                input.value = '';
                
            }
        }else {
            console.log('cant find hisInfos')
        }
    }

        if(!isEmpty(props.hisInfos))
        { 
        return(
                <div className={classes.chatBox}>
                <div id="messages">
                </div>
                <Input id="msg" type="text"  className={classes.textInput} placeholder="Message Goes Here" onKeyUp={sendMessage} />
                </div>
        )
    } else {
        return(
                <div className={classes.chatBox}>
                 <p>please select a person to chat with</p>
                </div>
        )
    }
}

export default ChatBox;