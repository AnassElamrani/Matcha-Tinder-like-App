import React from "react"
import Axios from "axios"
import { withRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import "../../../start/styles.css"
import {
  Avatar, 
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  List,
  IconButton,
  Hidden,
  Drawer,
  ListItemText,
  ListItemIcon,
  ListItem,
  // Badge
} from "@material-ui/core"
import {
  Menu as MenuIcon
  // LocationOn
} from "@material-ui/icons"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { FaHome, FaInfoCircle, FaHistory, FaHotjar, FaRegSun } from "react-icons/fa"
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri"
import { MdAccountCircle } from "react-icons/md"

import About from "./About"
import Chat from "../../chat/Chat"
import Browsing from "../../browsing/browsing"
import Home from "../../profil/Home"
import EditProfil from "../../profil/editProfill"
import Setting from "../../profil/setting"
import History from "../../history/history"

const instance = Axios.create({ withCredentials: true });

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  ty: {
    flexGrow: 1,
    fontFamily: "Comfortaa",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const ResponsiveDrawer = (props) => {
  const { history, window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [lat, setLat] = React.useState(false);
  const [long, setLong] = React.useState(false);
  const [requiredProfilInfo, setRPI] = React.useState('');
  const [avatar, setAvatar] = React.useState('');

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const func = async () => {
    if (props.loggedin){
      await instance.get('http://localhost:3001/base').then(
        (response) => {
          if (response.data.user.id !== undefined) {
            setId(response.data.user.id)
          }
        },
        (err) => {}
      )
      if (id !== '') {
        instance
          .post('http://localhost:3001/user/userInfoVerification', { userId: id })
          .then(
            (res) => {
              if (res.data.status === true) {
                setRPI(true)
              } else setRPI(false)
            },
            (err) => {}
          )
      }
    }
  }

  React.useEffect(() => {
      func()
  })

  React.useEffect(() => {
    // Get Profile Img (for avatar)
    if(id)
    {
      // console.log('avatar', avatar);
      Axios.post('http://localhost:3001/user/getUserAvatar', {userId: id})
      .then((res) => {
        // console.log(res);
        if(res.data.image)
        {
          setAvatar(res.data.image);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })

  const getLocIp = React.useCallback(() => {
    // get locallization with help of ip
    Axios.get('https://api.ipify.org?format=json').then(async (res) => {
      await Axios.get(`http://ip-api.com/json/${res.data.ip}`).then(res => {
        console.log(res.data)
        setLat(res.data.lat);
        setLong(res.data.lon);
      })
      if (id) Axios.post(`base/localisation/${id}`, { lat: lat, long: long });
    })
  }, [id, lat, long])

  React.useEffect(() => {
    // save the localization here
    if (lat === false && long === false){
      // hta l push after enablet
      // getLocIp()
    }else
      if (id) Axios.post(`base/localisation/${id}`, { lat: lat, long: long });
  }, [id, lat, long, getLocIp]);


  const handelLogout = () => {
    instance.post("http://localhost:3001/logout");
    props.logout();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const itemsListOne = [
    {
      id: 0,
      text: 'Home',
      icon: <FaHome />,
      onClick: () => history.push('/'),
      hidden: true,
      disabled: requiredProfilInfo,
    },
    {
      id: 1,
      text: 'browsing',
      icon: <FaHotjar />,
      onClick: () => history.push(`/browsing/${id}`),
      disabled: !requiredProfilInfo,
    },
    {
      id: 3,
      text: 'Profile',
      icon: <MdAccountCircle />,
      onClick: () => history.push(`/edit/${id}`),
      disabled: !requiredProfilInfo,
    },
    {
      id: 4,
      text: 'History',
      icon: <FaHistory />,
      onClick: () => history.push(`/history/${id}`),
      disabled: !requiredProfilInfo,
    },

    {
      id: 5,
      text: 'Setting',
      icon: <FaRegSun />,
      onClick: () => history.push('/setting'),
      disabled: !requiredProfilInfo,
    },
    {
      id: 6,
      text: 'Chat',
      icon: <AiFillMessage />,
      onClick: () => history.push('/chat'),
      disabled: !requiredProfilInfo,
    },
    {
      id: 7,
      text: 'About',
      icon: <FaInfoCircle />,
      onClick: () => history.push('/about'),
      disabled: !requiredProfilInfo,
    },
  ]
  const itemsListTwo = [
    {
      id: 100,
      text: "Logout",
      icon: <RiLogoutCircleLine />,
      onClick: () => {
        handelLogout();
      },
    },
  ];
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List key={Math.random()}>
        {itemsListOne.map((item, index) => {
          const { id, text, icon, onClick, disabled, hidden } = item
          if (!hidden) {
            return (
              <ListItem button key={id} disabled={disabled} onClick={onClick}>
                <ListItemText style={{color: "purple"}} key={id + Math.random()} primary={text} />
                {icon && <ListItemIcon style={{color: "purple"}}>{icon}</ListItemIcon>}
              </ListItem>
            )
          }
          return <React.Fragment key={Math.random()}></React.Fragment>
        })}
      </List>
      <Divider />
      <List key={Math.random()}>
        {itemsListTwo.map((item, index) => {
          const { id, text, icon, onClick } = item
          return (
            <ListItem button key={id} onClick={onClick}>
              <ListItemText key={id + Math.random()} primary={text} />
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
            </ListItem>
          )
        })}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='secondary'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.ty} variant='h6' noWrap>
            matcha
          </Typography>
          {
            (1 === 2) ?
            <Avatar alt="Username" src={`http://localhost:3001/${avatar}`}/>
            :
            <Avatar alt="?" src={`http://localhost:3001/${avatar}`}/>
          }
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path='/edit/:id' component={EditProfil} />
          <Route
            exact
            path='/chat'
            render={(props) => <Chat id={id} />}
          />
          <Route
            exact
            path='/browsing/:id'
            render={(props) => <Browsing id={id} />}
          />
          <Route exact path='/history/:id' component={History} />
          <Route
            exact
            path='/setting'
            component={(props) => <Setting id={id} />}
          />
          <Route exact path='/about' component={About} />
          {requiredProfilInfo === true ? (
            <Route exact path='/' render={(props) => <Browsing id={id} />} />
          ) : (
            <Route exact path='/*' render={(props) => <Home id={id} />} />
          )}
        </Switch>
      </main>
    </div>
  )
};

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
