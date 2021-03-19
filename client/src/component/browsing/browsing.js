import React from 'react'
import Axios from 'axios'
// import moment from 'moment'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Filter from './filter'
import SortComponent from './sort'
import clsx from 'clsx'
import Profil from './profil'
import Map from "./map"
import Search from './search'
import {
  Card, CardHeader, CardContent, CardActions,Badge, Grid,
  Collapse, Avatar, IconButton, Typography, Container
} from '@material-ui/core'
import {Alert} from '@material-ui/lab';
import {
  Favorite,
  ThumbDown as ThumbDownIcon,
  SkipNext as SkipNextIcon,
} from '@material-ui/icons'
import SocketContext from "../../start/SocketContext";
import IdContext from "../../start/IdContext";

const StyledBadge = withStyles((theme) => ({
  // badge: (props) => 
  //   props.status === "true"
  //   ? {
  //       backgroundColor: '#A9A9A9',
  //       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  //       '&::after': {
  //         border: '1px',
  //       },
  //     }
  //   : {
  //       backgroundColor: '#44b700',
  //       color: '#44b700',
  //       boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  //     },
}))(Badge)

const useStyles = makeStyles((theme) => ({
  diva: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: '100vh',
  },
  container: {
    fontFamily: 'Comfortaa',

  },
  copy: {
    // [theme.breakpoints.up("lg")]: {
    //   marginLeft: theme.spacing(70),
    // },
    textAlign: 'center',
  },
  root: {
    // height: '35vh',
    // width: '50vh',
    backgroundColor: '#FFFAFA',
    color: '#778899',
    boxShadow: `10px 10px 10px #A9A9A9`,
    maxWidth: 395,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media1: {
    width: '2vw',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  date: {
    paddingRight: '13vw'
  },
}))

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])
  const [gender, setGender] = React.useState('')
  const classes = useStyles()
  const [list, setList] = React.useState([])
  const [list1, setList1] = React.useState([])
  const [statusImg, setStatusImg] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  // const [status, setStatus] = React.useState("true")
  // const [curTime, setcurTime] = React.useState()
  const [didMount, setDidMount] = React.useState(false)
  const globalId = React.useContext(IdContext)
  // const [active, setActive] = React.useState("")
  const socket = React.useContext(SocketContext);
  // new Date().toLocaleString()

  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${globalId}`).then((res) => {
      setGender(res.data.type)
      setCord(res.data.geo)
    })
  }, [globalId])

  React.useEffect(() => {
    Axios.post(`/base/img/fetch/${globalId}`, {
      userId: globalId,
    }).then((res) => {
      if (res.data.s === 0){
        /// update status in db with 3 if khass
        setStatusImg(true)
      }
      else{
        /// update status in db with 2 if khass
        setStatusImg(false)
      }
    })
    if (cord.length) {
      Axios.post(`/browsing/${globalId}`, {
        cord: cord,
        gender: gender,
      }).then((res) => {
        if (res.data){
          setList(res.data)
          setList1(res.data)  
        }
      })
    } else getLocalisation()
    setDidMount(true)
    return () => setDidMount(false);
  }, [cord, gender, getLocalisation, globalId])

  const handelLike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/likes/${idLiker}`, { idLiked: idLiked }).then(res => {
      if (res.data.status) {
        const newList = list1.filter((item) => item.id !== idLiked)
        setList1(newList)

        // like && like back Notif

        Axios.post('http://localhost:3001/notifications/doILikeHim', { myId: idLiker, hisId: idLiked })
          .then((res) => {
            if (res.data.answer == "yes") {
              Axios.post('http://localhost:3001/notifications/saveNotifications',
                { who: idLiker, target: idLiked, type: "likes back" })
                .then((res) => {
                }).catch((err) => {console.log(err)});
            }
            else if(res.data.answer == "no")
            {
              Axios.post('http://localhost:3001/notifications/saveNotifications',
                { who: idLiker, target: idLiked, type: "like" })
                .then((res) => {
                }).catch((err) => {console.log(err)});
            } 

          }).catch((Err) => { console.log('10_1.Err', Err) })

        socket.emit('new_like', { who: idLiker, target: idLiked });
      }
    })
  }

  const handelSkip = (event, idLiked) => {
    event.preventDefault()
    const newList = list1.filter((item) => item.id !== idLiked)
    setList1(newList)
    if (list1.length === 1)
      getLocalisation()
  }
  

  const handelDeslike = (event, idLiker, idLiked) => {
    event.preventDefault()
    if (statusImg)
      setOpen(true)
    else{
      Axios.post(`/browsing/deslike/${idLiker}`, {idLiked: idLiked}).then(res => {
        if (res.data.status) {
          const newList = list1.filter((item) => item.id !== idLiked)
          setList1(newList)
        }
      })
    }
  }


  React.useEffect(() => {
    
    const interval = setInterval(() => {
      if (open)
        setOpen(false)
    }, 1500);
    return () => clearInterval(interval);
  })

  if (!didMount)
    return null

  return (
    <div className={classes.diva}>
      <Collapse in={open}>
        <Alert  severity="error">
          Add at least one image to your profil.
        </Alert>
      </Collapse>
      <Grid
        container
        className={classes.container}
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12} sm={2}>
          <SortComponent setList={setList1} list={list1} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Map list={list} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Search
            setList={setList}
            setList1={setList1}
            cord={cord}
            gender={gender}
            id={props.id}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Filter setList1={setList1} list={list} />
        </Grid>
        <Container className={classes.copy} component='main' fixed disableGutters>
        {list1 &&
            list1
              .map((el, key) => {
                const imageProfil = el.images.split(',')
                return (
                  <Card className={classes.root} key={key}>
                    <CardHeader
                      avatar={
                        <StyledBadge
                          overlap='circle'
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          variant='dot'
                        >
                          <Avatar
                            aria-label='recipe'
                            src={`http://localhost:3001/${imageProfil[0]}`}
                            alt={`test${imageProfil[0]}`}
                          />
                        </StyledBadge>
                      }
                      action={
                        <IconButton aria-label='settings'>
                          <Profil
                            visitor={props.id}
                            visited={el.id}
                            element={el}
                            list={list1}
                            setlist={setList1}
                            StyledBadge={StyledBadge}
                            statusImg={statusImg}
                            setOpen={setOpen}
                          />
                        </IconButton>
                      }
                      title={el.userName}
                      subheader={el.firstName + ' ' + el.lastName}
                    />
                    <CardContent>
                      <Typography variant='h6'>Biography :</Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        {el.bio}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label='add to favorites'
                        onClick={(event) =>
                          handelLike(event, props.id, el.id)
                        }
                      >
                        <Favorite style={{ color: 'green' }} />
                      </IconButton>
                      <IconButton
                        aria-label='skip'
                        onClick={(event) => handelSkip(event, el.id)}
                      >
                        <SkipNextIcon style={{ color: 'DarkBlue' }} />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand)}
                        aria-label='NotInterested'
                        onClick={(event) =>
                          handelDeslike(event, props.id, el.id)
                        }
                      >
                        <ThumbDownIcon color='secondary' />
                      </IconButton>
                    </CardActions>
                  </Card>
                )
              })
              .splice(0, 20)}
        </Container>
      </Grid>
    </div>
  )
}

export default Browsing