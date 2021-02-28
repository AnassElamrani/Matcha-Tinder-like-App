import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Filter from './filter'
import SortComponent from './sort'
import clsx from 'clsx'
import Profil from './profil'
import Map from "./map"
import Search from './search'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  // Collapse,
  Avatar,
  IconButton,
  Typography,
  Container,
  Grid,
  Box
} from '@material-ui/core'
import {
  Favorite,
  ThumbDown as ThumbDownIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  diva: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: '100vh',
  },
  container: {
    fontFamily: "Comfortaa"
  },
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  root: {
    maxWidth: 345,
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
}))

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])
  const [gender, setGender] = React.useState('')
  const classes = useStyles()
  const [list, setList] = React.useState([])
  const [list1, setList1] = React.useState([])

  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.id}`).then((res) => {
      setGender(res.data.type)
      setCord(res.data.geo)
    })
  }, [props.id])

  React.useEffect(() => {
    if (cord.length) {
      Axios.post(`/browsing/${props.id}`, {
        cord: cord,
        gender: gender,
      }).then((res) => {
        console.log(res.data)
        if (res.data){
          setList(res.data)
          setList1(res.data)  
        }
      })
    } else getLocalisation()
  }, [cord, gender, getLocalisation, props.id])

  const handelLike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/likes/${idLiker}`, {idLiked: idLiked}).then(res => {
      console.log(res.data)
      if (res.data.status) {
        const newList = list1.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  const handelDeslike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/deslike/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list1.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  return (
    <div className={classes.diva}>
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
          <Map list={list1} />
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
        <Container className={classes.copy} component='main' maxWidth='xs'>
          <Grid item xs={12} sm={12}>
            {list1 &&
              list1
                .map((el, key) => {
                  const imageProfil = el.images.split(',')
                  return (
                    <Box m={2} key={key}>
                      <Card className={classes.root}>
                        <CardHeader
                          avatar={
                            <Avatar
                              aria-label='recipe'
                              src={`http://localhost:3001/${imageProfil[0]}`}
                              alt={`test${imageProfil[0]}`}
                            ></Avatar>
                          }
                          action={
                            <IconButton aria-label='settings'>
                              <Profil
                                visitor={props.id}
                                visited={el.id}
                                element={el}
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
                    </Box>
                  )
                })
                .splice(0, 20)}
          </Grid>
        </Container>
      </Grid>
    </div>
  )
}

export default Browsing