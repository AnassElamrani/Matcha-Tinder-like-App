import React from "react";
import Axios from "axios";
import { makeStyles, Grid, Paper, List ,ListItem ,ListItemSecondaryAction ,ListItemText ,ListItemAvatar ,Checkbox ,Avatar} from '@material-ui/core';

const ChatList = (props) => {

    const [people, setPeople] = React.useState([]);


    
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
    }, [])
    console.log('people', people)
    return (
        <div>
        <Grid container spacing={1} style={{background: 'lightgray'}}>
        <Grid item md={2}>
            <h3>People</h3>
            <hr />
            <List>
            {
                people.map((item, index) => {
                    const {userName, image} = item;
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                     <ListItem key={index}>
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
        <Grid item md={8} style={{border: '0.5px white solid'}}><h3>Chat</h3></Grid>
        <Grid item md={2}><h3>Profile & Utilitie</h3></Grid>
        </Grid>
        </div>
    )
}

export default ChatList;