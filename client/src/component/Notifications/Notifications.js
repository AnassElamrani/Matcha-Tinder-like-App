import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Axios from "axios"
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { StylesProvider } from "@material-ui/core/styles";
import "./notifications.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import SocketContext from "../../start/SocketContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    Troot: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    // bdg : {
    //     backgroundColor: 'pink'
    // }
}));

const Notifications = (props) => {
    const classes = useStyles();

    const socket = React.useContext(SocketContext);
    const [notifNumber, SetNotifNumber] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);
    // const [messageNumber, SetmessageNumber] = React.useState(0);

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        SetNotifNumber(0);
        getUserNotifs(props)
    };

    const getUserNotifs = (props) => {
        console.log(props);
        Axios.post('http://localhost:3001/notifications/getUserNotifs', { userId: props.myInfos.id })
            .then((res) => {
                console.log('111111');
                if (isEmpty(res.data.whoInfos) == false) {
                    setNotifications(res.data.whoInfos);
                    console.log('saved notif', res.data.whoInfos);
                }
            }).catch((Err) => { console.log('10_1.Err', Err) })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const snn = (x) => {
        SetNotifNumber(" ");
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // React.useEffect(() => {
        socket.on('receive_like', (data) => {
            console.log('|-----=> ', data);
            if(data.target === props.myInfos.id)
                snn(notifNumber);
        })
        socket.on('receive_visit', (data) => {
            console.log('|---visit=> ', data);
            if(data.target === props.myInfos.id)
                snn(notifNumber);
        })
        socket.on('receive_dislike', (data) => {
            console.log('|---dislike=> ', data.target, props.myInfos.id);
            if(data.idDisliked === props.myInfos.id)
                snn(notifNumber);
        })

    // }, []);
    console.log('notifications', notifications)
    return (
        <StylesProvider injectFirst>

        <div className={classes.Troot}>
            <Badge className={classes.bdg} badgeContent={notifNumber} aria-describedby={id} color="secondary" onClick={handleClick}>
                <NotificationsIcon />
            </Badge>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {
                    (notifications.length === 0) ? <Typography>nulllllllllll</Typography>
                     :       
                    notifications.map((el) => {
                        if(el.type != "message")
                        {

                            return(
                                <List className={classes.root}>

                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={`${el.userName}image`} src={`http://localhost:3001/${el.image}`} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    el.type == "like" ? "New like" 
                                    :
                                    el.type == "visit" ? "New visit"
                                    :
                                    el.type == "likes back" ? "Matched"
                                    :
                                    el.type == "dislike" ? "Unmatched" : ''
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                            >
                                            {el.userName}
                                        </Typography>
                                        {`${el.type }your profile`}
                                    </React.Fragment>
                                }
                                />
                        </ListItem>
                        <Divider variant="inset" component="li" />

                    </List>
                            )
                        }
                            })
                        }
                        
                        </Popover>
                        {/* <Badge badgeContent={messageNumber} color="primary">
                        <MailIcon />
            </Badge> */}
            {/* <Badge badgeContent={notifNumber} color="primary">
                <NotificationsIcon />
            </Badge> */}
        </div>
        </StylesProvider>
    )
};





export default Notifications;