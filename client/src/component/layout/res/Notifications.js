import React from "react"
import Axios from "axios"
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SocketContext from "../../../start/SocketContext";

const Notifications = () => {
    const socket = React.useContext(SocketContext);

    const [notifNumber, SetNotifNumber] = React.useState(0);
    const [messageNumber, SetmessageNumber] = React.useState(0);

    React.useEffect(() => {
        socket.on('receive_like', (data) => {
            snn(notifNumber);
            console.log('|-----=> ', data);
            // save it to db
            Axios.post('http://localhost:3001/notifications/saveNotification',
                { who: data.who, target: data.target, type: "like" })
                .then((res) => {
                    console.log('reSdasd21');
                })

        })
    }, []);
    const snn = (x) => {
        x++;
        SetNotifNumber(x);
    }

    return (
        <div>
            <Badge badgeContent={messageNumber} color="primary">
                <MailIcon />
            </Badge>
            <Badge badgeContent={notifNumber} color="primary">
                <NotificationsIcon />
            </Badge>
        </div>
    )
};

export default Notifications;