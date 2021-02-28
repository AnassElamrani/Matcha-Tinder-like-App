import React from "react";
import Axios from "axios";
import ChatBox from "./ChatBox";
import { makeStyles, Grid, Tabs, Tab, AppBar, Paper, List ,ListItem ,ListItemSecondaryAction ,ListItemText ,ListItemAvatar ,Checkbox ,Avatar} from '@material-ui/core';

// we have to get email of connected user & email of user to cha with;
// myEmail will be the room's name

const ChatList = (props) => {

    const [people, setPeople] = React.useState([]);
    const [hisInfos, setHisInfos] = React.useState({});
    const [myInfos, setMyInfos] = React.useState({})

    // getting people matched with (email, userName, profilPicture);

    React.useEffect(() => {
        Axios.post('http://localhost:3001/chat/people', {userId : props.id})
        .then((res) => {
            if(res.data.boards)
            {
                var result = res.data.boards
                console.log('boards', result);
                console.log('...boards', ...result);
                setPeople([...result]);
            
            }
        }).catch((err) => {console.log(err)})
        //

        Axios.post('http://localhost:3001/chat/getConnectedUserInfos', {userId: props.id})
        .then((res) => {
            if(res)
                setMyInfos(res.data.myInfos);
            else
                setMyInfos({});
        }).catch((err) => {console.log(err)})
    }, [])
    
    
    console.log('tijani', myInfos);
    // console.log('people', people)
    const passHisInfos = (x) => {
        setHisInfos(x);
    }
    
    return (
        <div>
        <Grid container spacing={1} style={{background: '#EEEEEE', height: '70vh'}}>
        <Grid item md={2}>
            <h4>People</h4>
            <h4>Messages</h4>
            <hr />
            <List>
            {
                people.map((item, index) => {
                    const {userName, email, image} = item;
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                     <ListItem key={index} onClick={(e) => {passHisInfos({userName:userName, email:email, image:image})}}>
                         <ListItemAvatar>
                             <Avatar
                                 alt={`${userName} picture`}
                                 src={`http://localhost:3001/${image}`}
                             />
                         </ListItemAvatar>
                         <ListItemText id={labelId} primary={userName} />
                     </ListItem>   
                    );
                })
            }
            </List>
        </Grid>
        <Grid item md={8} style={{border: '0.5px white solid'}}>
        <ChatBox  
        myInfos={myInfos} 
        hisInfos={hisInfos}
        />
        </Grid>
        <Grid item md={2}><h3>Profile & Utilitie</h3></Grid>
        </Grid>
        </div>
    )
}

export default ChatList;