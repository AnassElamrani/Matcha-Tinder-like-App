import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core/';
import SocketContext from "../../start/SocketContext";

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
    
    
    const ChatBox = (props) => {
        
        const socket = React.useContext(SocketContext);
        // const socket = 
        React.useEffect(() => {
            // socket.emit('newConnection');
            if(props.myInfos)
                socket.emit('join', {id: props.myInfos.id});
        }, [])
        console.log('my', props.myInfos);
        console.log('his', props.hisInfos);
        socket.on('new_msg', (data) => {
            console.log('data', data);
            var messages = document.getElementById('messages');
            var span = document.createElement('span');
            span.innerHTML = data.msg+'</br>';
            messages.appendChild(span);
            // alert(data);
        })
        // {
        // socket.on('connect', () => {
        //     socket.emit('myRoom', props.myInfos.id);
        // })


        // }

        // console.log('name:',props.name );

        const classes = useStyles();

        const sendMessage = (e) => {
            e.preventDefault();
            if(props.hisInfos)
            {
                // console.log('his', props.hisInfos);

                var input = document.getElementById('msg');
                if(e.keyCode === 13)
                {
                    socket.emit('msg', {text:input.value, to: props.hisInfos.id});
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