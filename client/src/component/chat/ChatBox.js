import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Collapse } from "@material-ui/core";
import { Input, Grid, List, Chip } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Block as BlockIcon,
  Update as UpdateIcon,
} from "@material-ui/icons";
import SocketContext from "../../start/SocketContext";
import Axios from "axios";
import "./ChatBox.js";
import Report from "../browsing/report";

const useStyles = makeStyles((theme) => ({
  chatBox: {
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  messages: {
    padding: "14px",
  },
  textInput: {
    position: "absolute",
    bottom: 0,
    color: "purple",
    width: "100%",
  },
  right: {
    wordBreak: "break-all",
    padding: "10px",
  },
  left: {
    wordBreak: "break-all",
    padding: "10px",
  },
  myText: {
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "#e6b4e4",
    padding: "10px",
    float: "right",
  },
  hisText: {
    color: "white",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "#000000a8",
    padding: "10px",
  }
}));
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

const ChatBox = (props) => {
  const [conversation, setCoversation] = React.useState([]);
  const classes = useStyles();
  const [list, setList] = React.useState([]);
  const [statusImg, setStatusImg] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const socket = React.useContext(SocketContext);

  const func = React.useCallback(async () => {
    if (!isEmpty(props.hisInfos)) {
      await Axios.post("http://localhost:3001/chat/getConversation", {
        user1: props.id,
        user2: props.hisInfos.id,
      })
        .then((res) => {
          if (res.data.response.length != 0) {
            setCoversation(res.data.response);
          }
          if (res.data.response === "") {
            setCoversation([]);
          }
        })
        .catch((err) => {
          console.log("ErR" + err);
        });
    }
  }, [props]);

  React.useEffect(() => {
    Axios.post(`/base/img/fetch/${props.id}`, {
      userId: props.id,
    }).then((res) => {
      if (res.data.s === 0) {
        /// update status in db with 3 if khass
        setStatusImg(true);
      } else {
        /// update status in db with 2 if khass
        setStatusImg(false);
      }
    });
    func();
  }, [func, props]);

  const updateScroll = () => {
    var element = document.getElementById("t")
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (props.hisInfos) {
      var input = document.getElementById("msg");
      if (e.keyCode === 13 && input.value) {

        saveMessage(input.value);
        Axios.post("http://localhost:3001/notifications/saveNotifications", {
          who: props.id,
          target: props.hisInfos.id,
          type: "message",
        });
        socket.emit("msg", {
          text: input.value,
          from: props.myInfos.id,
          to: props.hisInfos.id,
        });
        input.value = "";
      }
    }
  };

  React.useEffect(() => {
    socket.on("new_msg", (data) => {
      setCoversation((conversation) => [
        ...conversation,
        {
          id: conversation.length
            ? conversation[conversation.length - 1].id + 1
            : 1,
          id_from: data.from,
          id_to: data.to,
          content: data.msg,
        },
      ]);
    });
  }, []);

  const saveMessage = (content) => {
    Axios.post("http://localhost:3001/chat/saveMessage", {
      from: props.id,
      to: props.hisInfos.id,
      content: content,
    })
      .then((res) => {
        setCoversation((conversation) => [
          ...conversation,
          {
            id: conversation.length
              ? conversation[conversation.length - 1].id + 1
              : 1,
            id_from: props.id,
            id_to: props.hisInfos.id,
            content: content,
          },
        ]);
      updateScroll();

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelBlock = (e, user1, user2) => {
    console.log(user2);
    if (statusImg) setOpen(true);
    else {
    Axios.post(`/block/${user1}`, { blocked: user2 }).then((res) => {
      if (res.data.status) {
          const newList = props.people.filter((item) => item.id !== user2);
          props.setPeople(newList);
      }
    });
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (open) setOpen(false);
    }, 1500);

    return () => clearInterval(interval);
  });

  if (!isEmpty(props.hisInfos)) {
    return (
      <div className={classes.chatBox}>
        <Collapse in={open}>
          <Alert severity="error">Add at least one image to your profil.</Alert>
        </Collapse>
        <Grid container direction="column" spacing={2} className="messages">
          <Grid container item xs={12} direction="row">
            <IconButton
              aria-label="Block User"
              color="secondary"
              onClick={(event) =>
                handelBlock(event, props.id, props.hisInfos.id)
              }
            >
              <BlockIcon />
            </IconButton>
            <Report
              visitor={props.id}
              visited={props.hisInfos.id}
              statusImg={statusImg}
              setOpen={setOpen}
            />
          </Grid>
          <List id="t" style={{ maxHeight: 300, overflow: "auto" }}>
            {conversation.length != 0 &&
              conversation.map((element) => {
                if (element.id_from == props.myInfos.id) {
                  return (
                    //hnaya1
                    <Grid item container className={classes.me}>
                      <Grid item sm={4}></Grid>
                      <Grid item sm={8} className={classes.right}>
                        <Chip
                          className={classes.myText}
                          variant="outlined"
                          size="small"
                          label={element.content}
                        />
                      </Grid>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid item container className={classes.him}>
                      <Grid item sm={8} className={classes.left}>
                        <Chip
                          className={classes.hisText}
                          variant="outlined"
                          size="small"
                          label={element.content}
                        />
                      </Grid>
                      <Grid item sm={4}></Grid>
                    </Grid>
                  );
                }
              })}
            {!conversation.length && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Say hello ...
              </Typography>
            )}
          </List>
        </Grid>
        <Input
          id="msg"
          type="text"
          className={classes.textInput}
          placeholder="Message"
          onKeyUp={sendMessage}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.chatBox}>
        <Typography variant="body2" color="textSecondary" component="p">
          &nbsp;&nbsp;&nbsp;&nbsp;select the user you want to chat with
        </Typography>
      </div>
    );
  }
};

export default ChatBox;
