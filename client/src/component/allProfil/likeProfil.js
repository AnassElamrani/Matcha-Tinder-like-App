import React from 'react';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Chip, Avatar, Grid, Button, Typography, IconButton, CardMedia } from '@material-ui/core'
import Rating from "react-rating"
import Report from '../browsing/report'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import {  FaFemale ,FaMale  } from "react-icons/fa"
import {
  Block as BlockIcon,
  FavoriteBorder
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  diva: {
    height: '100vh',
  },
  media: {
    height: '40vh',
  },
  typo: {
    marginLeft: '1vw',
    marginTop: '1vw'
  },
  typo1: {
    marginLeft: '1vw',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  Button: {
    marginTop: '2vw',
    marginLeft: '40vw'
  }
}))




const LikeProfil = (props) => {
    const [cord, setCord] = React.useState([])
    const [gender, setGender] = React.useState('')
    const classes = useStyles()
    const [list, setList] = React.useState([])
    const [didMount, setDidMount] = React.useState(false)


    const getLocalisation = React.useCallback(async () => {
        await Axios.post(`/browsing/geo/${props.id}`).then((res) => {
            setGender(res.data.type)
            setCord(res.data.geo)
        })
        
    }, [props.id])

    React.useEffect(() => {
        if (cord.length) {
            Axios.post(`/allProfil/${props.id}`, {
                cord: cord,
                gender: gender,
            }).then((res) => {
                if (res.data){
                    setList(res.data)
                }
            })
        } else getLocalisation()
        setDidMount(true);
        return () => setDidMount(false);

    }, [cord, gender, getLocalisation, props.id])

    if (!didMount)
        return null

    const handelBlock = (e, user1, user2) => {
        Axios.post(`/block/${user1}`, {blocked: user2}).then(res => {
            if (res.data.status){
                const newList = list.filter((item) => item.id !== user2)
                setList(newList)
            }
        })
    }

    const nextUser = (event, id) => {
        event.preventDefault()
        const newList = list.filter((item) => item.id !== id)
        setList(newList)
        if (list.length === 1)
            getLocalisation()
    }

    const handelUnlike = (e, user1, user2) => {
        e.preventDefault()


        Axios.post(`/browsing/unlike/${user1}`, {user2 : user2}).then(res => {
            if (res.data.status){
                const newList = list.filter((item) => item.id !== user2)
                setList(newList)
            }
        })
    }

    return (
        <React.Fragment>
            {list && list.map((el, iKey) => {
                return (
                  <React.Fragment key={iKey}>
                    <div className={classes.diva}>
                      <Card>
                        <Grid
                          container
                          justify='center'
                          alignItems='center'
                          direction='column'
                          spacing={2}
                        >
                          <Grid item xs={12} sm={3}>
                            <Typography variant='h6' gutterBottom align='center'>
                              {el.userName}
                            </Typography>
                            <Carousel autoPlay showThumbs={false}>
                              {el.images.split(',').length > 1
                                ? el.images.split(',').map((el, iKey) => {
                                    let srcImg = `http://localhost:3001/${el}`
                                    let altImg = `display all image loop${iKey}`
                                    return (
                                      <div key={iKey}>
                                        <CardMedia
                                          className={classes.media}
                                          image={srcImg}
                                          title={altImg}
                                        />
                                        <p>{altImg}</p>
                                      </div>
                                    )
                                  })
                                : ''}
                            </Carousel>
                          </Grid>
                          <Grid container item xs={12} sm={2}>
                            <Avatar
                              aria-label='recipe'
                              src={`http://localhost:3001/${
                                el.images.split(',')[0]
                              }`}
                              alt={`test${el.images.split(',')[0]}`}
                            />

                            <Typography className={classes.typo}>
                              {'  ' +
                                el.firstName +
                                ' ' +
                                el.lastName +
                                ', ' +
                                el.age +
                                ' '}
                              {el.gender === 'Male' && (
                                <FaMale style={{ color: 'green' }} />
                              )}
                              {el.gender === 'Women' && (
                                <FaFemale style={{ color: 'pink' }} />
                              )}
                            </Typography>
                            <Typography
                              className={classes.typo1}
                              variant='body2'
                            >
                              {el.city + ' | ' + el.km.toFixed(2) + '  km'}
                            </Typography>
                          </Grid>
                          <Grid container item xs={12} sm={2}>
                            {el.tag1.split(',').length > 0
                              ? el.tag1.split(',').map((el, iKey) => {
                                  return (
                                    <div key={iKey}>
                                      <Chip
                                        color='secondary'
                                        variant='outlined'
                                        size='small'
                                        label={el}
                                      />
                                    </div>
                                  )
                                })
                              : ''}
                          </Grid>
                          <Grid container item xs={12} sm={2}>
                            <Typography color='primary' variant='caption'>
                              {el.bio}
                            </Typography>
                          </Grid>
                          <Grid container item xs={12} sm={2}>
                            {0 < el.fameRating && el.fameRating < 50 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={1}
                                />
                                <br />
                                {el.fameRating + ' exp Useless'}
                              </Typography>
                            )}
                            {50 < el.fameRating && el.fameRating < 150 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={1}
                                />
                                <br />
                                {el.fameRating + ' exp Useless+'}
                              </Typography>
                            )}
                            {150 < el.fameRating && el.fameRating < 250 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={2}
                                />
                                <br />
                                {el.fameRating + ' exp Poor'}
                              </Typography>
                            )}
                            {250 < el.fameRating && el.fameRating < 350 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={2}
                                />
                                <br />
                                {el.fameRating + ' exp Poor+'}
                              </Typography>
                            )}
                            {350 < el.fameRating && el.fameRating < 450 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={3}
                                />
                                <br />
                                {el.fameRating + ' exp Ok'}
                              </Typography>
                            )}
                            {450 < el.fameRating && el.fameRating < 550 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={3}
                                />
                                <br />
                                {el.fameRating + ' exp Ok+'}
                              </Typography>
                            )}
                            {550 < el.fameRating && el.fameRating < 650 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={4}
                                />
                                <br />
                                {el.fameRating + ' exp Good'}
                              </Typography>
                            )}
                            {650 < el.fameRating && el.fameRating < 750 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={4}
                                />
                                <br />
                                {el.fameRating + ' exp Good+'}
                              </Typography>
                            )}
                            {750 < el.fameRating && el.fameRating < 850 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={5}
                                />
                                <br />
                                {el.fameRating + ' exp Excellent'}
                              </Typography>
                            )}
                            {850 < el.fameRating && el.fameRating < 1001 && (
                              <Typography
                                style={{ color: 'Gold' }}
                                variant='caption'
                              >
                                <Rating
                                  style={{ pointerEvents: 'none' }}
                                  initialRating={5}
                                />
                                <br />
                                {el.fameRating + ' exp Excellent+'}
                              </Typography>
                            )}
                          </Grid>
                          <Grid container item xs={12} sm={2} direction='row'>
                            <IconButton
                              aria-label='Block User'
                              onClick={(event) =>
                                handelBlock(event, props.id, el.id)
                              }
                            >
                              <BlockIcon />
                            </IconButton>
                            <Report visitor={props.id} visited={el.id} />
                            <IconButton
                              aria-label='Unlike user'
                              onClick={(event) =>
                                handelUnlike(event, props.id, el.id)
                              }
                            >
                              <Typography>Unlike</Typography>
                              <FavoriteBorder />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Card>
                      <Button
                        autoFocus
                        variant='outlined'
                        onClick={(event) => nextUser(event, el.id)}
                        style={{ color: 'DarkBlue' }}
                      >
                        Next user
                      </Button>
                    </div>
                  </React.Fragment>
                )
            }).slice(0, 1)}
        </React.Fragment>
    )
}

export default LikeProfil;