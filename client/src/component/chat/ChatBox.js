import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Input, Grid } from '@material-ui/core/';
import SocketContext from "../../start/SocketContext";
import Axios from "axios";
import "./ChatBox.js";

// import { io } from "socket.io-client";
// const URL = "http://localhost:3001";
// const socket = io(URL);


const useStyles = makeStyles(() => ({
    chatBox: {
        height: '100%',
        backgroundColor: 'white',
        position: "relative",
    },
    messages: {
        padding: '14px',
        // position: 'relaive',
    },
    textInput: {
        position: "absolute",
        bottom: 0,
        color: 'purple',
        width: '100%',
    },
    right: {
        wordBreak: 'break-all',
        padding: '10px',
    },
    left: {
        wordBreak: 'break-all',
        padding: '10px',
    },
    myText: {
        width: 'fit-content',
        borderRadius: '7px',
        backgroundColor: '#e6b4e4',
        padding: '10px',
        float: 'right',
    },
    hisText: {
        color: 'white',
        width: 'fit-content',
        borderRadius: '7px',
        backgroundColor: '#000000a8',
        padding: '10px',

    },

}));
const isEmpty = (obj) => {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    } return true;
}

const ChatBox = (props) => {
    const [conversation, setCoversation] = React.useState([]);
    const classes = useStyles();

    const displayMessages = (convArray, myInfos, hisInfos) => {
        var myDiv = document.getElementsByClassName('right');
        var hisDiv = document.getElementsByClassName('left');
        console.log('myDiv', myDiv);
        console.log('hisDiv', hisDiv);
            // convArray.map((element) => {
            //     if(element.id_from == myInfos.id)
            //     {
            //         console.log('1');
            //         var myText = document.createElement('div');
            //         myText.innerText = element.content;
            //         myText.setAttribute('className', classes.myText);
            //         myDiv.appendChild(myText);
            //     }
            //     if (element.id_from == hisInfos.id);
            //     {
            //         console.log('2');
            //         var hisText = document.createElement('div');
            //         hisText.innerText = element.content;
            //         hisText.setAttribute('className', classes.hisText);
            //         hisDiv.appendChild(hisText);
            //     } 
            //     if(1 ==2 ) {
            //         console.log('3');
            //     }
            // })
    }

    const socket = React.useContext(SocketContext);
    React.useEffect(() => {
        console.log('IDIDIDIDIDI', props.id);
        if(!isEmpty(props.hisInfos))
        {
            Axios.post('http://localhost:3001/chat/getConversation', { user1: props.id, user2: props.hisInfos.id })
            .then((res) => {
                if (res.data.response.length != 0)
                {
                    console.log('resConv', res.data.response);
                    setCoversation(res.data.response);
                    // displayMessages(res.data.response, props.myInfos, props.hisInfos);
                }
                if (res.data.response === "emptyConversation")
                console.log("Say Hello");
            })
            .catch((err) => { console.log('ErR' + err) });
        }
    }, [props.hisInfos])

    // React.useEffect(() => {
    // console.log('effect');
    // Axios.post('http://localhost:3001/chat/getConversation', {user1: props.id, user2: props.hisInfos.id})
    // .then((res) => {console.log('res', res)}).catch((err) => {console.log('ErR'+err)});
    // console.log('myInfos', props.id);
    //     if(props.id)
    //     {
    //         socket.emit('join', {id: props.id});
    // }
    // }, [])
    // console.log('his', props.hisInfos);
    // socket.on('new_msg', (data) => {
    //     console.log('data', data);
    //     var messages = document.getElementById('messages');
    //     var span = document.createElement('span');
    //     span.innerHTML = data.msg+'</br>';
    //     messages.appendChild(span);
    // })

    const saveMessage = (content) => {
        Axios.post('http://localhost:3001/chat/saveMessage', { from: props.id, to: props.hisInfos.id, content: content })
            .then((res) => {
                console.log(res);
            }).catch((err) => { console.log(err) });
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (props.hisInfos) {
            var input = document.getElementById('msg');
            if (e.keyCode === 13 && input.value) {
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
        } else {
            console.log('cant find hisInfos')
        }
    }
    console.log('****', conversation);
    // console.log('-props', props.hisInfos)
    if (!isEmpty(props.hisInfos)) {
        return (
            <div className={classes.chatBox}>
                <Grid container direction="column" spacing={2} className="messages">
                        {
                            conversation.map((element) => {
                                if(element.id_from == props.myInfos.id)
                                {
                                    return(
                                        <Grid item container className={classes.me}>
                                        <Grid item sm={4}></Grid>
                                        <Grid item sm={8} className={classes.right}>       
                                        <div className={classes.myText}>
                                            {element.content}
                                        </div>
                                        </Grid>
                                        </Grid>
                                    )
                                } else {
                                    return (

                                    <Grid item container className={classes.him}>
                                        <Grid item sm={8} className={classes.left}>       
                                        <div className={classes.hisText}>
                                            {element.content}
                                        </div>
                                        </Grid>
                                        <Grid item sm={4}></Grid>
                                        </Grid>
                                    )
                                }
                            })
                        }
                </Grid>
                <Input id="msg" type="text" className={classes.textInput} placeholder="Message" onKeyUp={sendMessage} />
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