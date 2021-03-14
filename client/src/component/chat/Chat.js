import React from "react";
import Axios from "axios";
import ChatBox from "./ChatBox";
import { Grid, Tabs, Tab, AppBar, Paper, List, ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar, Checkbox, Avatar, Badge, Hidden } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import FullWidthTabs from "./LeftSection";
import "./LeftSectionStyle.css";

// we have to get id of connected user & email of user to cha with;
// ids will make the room's name

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const ChatList = (props) => {

  const [people, setPeople] = React.useState([]);
  const [hisInfos, setHisInfos] = React.useState({});
  const [myInfos, setMyInfos] = React.useState({});
  const [stopLoop, xx] = React.useState('');

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  const saveMyInfos = (value) => {
    if (isEmpty != false)
      setMyInfos(value);
  }
  const passHisInfos = (x) => {
    setHisInfos(x);
  }

  // getting people matched with (id, userName, profilPicture);

  React.useEffect(() => {
    Axios.post('http://localhost:3001/chat/getConnectedUserInfos', { userId: props.id })
      .then((res) => {
        // if(!MyInfos)
        if (res) {
          saveMyInfos(res.data.myInfos);
        }

      }).catch((err) => { console.log(err) })

    Axios.post('http://localhost:3001/chat/people', { userId: props.id })
      .then((res) => {
        if (res.data.boards) {
          var result = res.data.boards
          console.log('boards', result);
          console.log('...boards', ...result);
          setPeople([...result]);

        }
      }).catch((err) => { console.log(err) })
    //

  }, [stopLoop])

  // console.log("*******", hisInfos);

  return (
    <StylesProvider injectFirst>
      <div>
        <Grid container spacing={1} style={{ background: '#EEEEEE', height: '70vh' }}>
          <Grid item md={3}>
            <FullWidthTabs people={people} passHisInfos={passHisInfos} />

          </Grid>
          <Grid item md={9}>
            <ChatBox
              id={props.id}
              myInfos={myInfos}
              hisInfos={hisInfos} id={props.id}
            />
          </Grid>
        </Grid>
      </div>
    </StylesProvider>
  )
}

export default ChatList;