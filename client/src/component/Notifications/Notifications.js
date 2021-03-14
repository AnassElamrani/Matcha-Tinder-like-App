import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Axios from "axios"
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SocketContext from "../../start/SocketContext";

const Notifications = (props) => {
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
            if(isEmpty(res.data.whoInfos) == false)
            {
                setNotifications(res.data.whoInfos);
                console.log('saved notif');
            }
        }).catch((Err) => { console.log('10_1.Err', Err) })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const snn = (x) => {
        x++;
        SetNotifNumber(x);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    React.useEffect(() => {
        socket.on('receive_like', (data) => {
            console.log('|-----=> ', data);
            snn(notifNumber);
        })

    }, []);

    return (
        <div>
            <Badge badgeContent={notifNumber} aria-describedby={id} color="primary" onClick={handleClick}>
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
                <Typography>The content of the Popover.</Typography>
            </Popover>
            {/* <Badge badgeContent={messageNumber} color="primary">
                <MailIcon />
            </Badge> */}
            {/* <Badge badgeContent={notifNumber} color="primary">
                <NotificationsIcon />
            </Badge> */}
        </div>
    )
};





export default Notifications;