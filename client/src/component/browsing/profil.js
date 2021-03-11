import React from 'react';
import Axios from 'axios'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { Chip, Avatar, Grid, Button, Dialog, Typography, IconButton, CardMedia } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {
  Close as CloseIcon,
  More as MoreIcon,
  Block as BlockIcon,
} from '@material-ui/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import {  FaFemale ,FaMale  } from "react-icons/fa"
import Rating from "react-rating"
import Report from './report'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        marginLeft: '12vw',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles((theme) => ({
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
}))

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const CustomizedDialogs = (props) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()

    const handleClickOpen = (e, visitor, visited) => {
        setOpen(true);
        Axios.post(`/browsing/history/${visited}`, {visitor: visitor})
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handelBlock = (e) => {
      Axios.post(`/block/${props.visitor}`, {blocked: props.visited}).then(res => {
        if (res.data.status){
          const newList = props.list.filter((item) => item.id !== props.visited)
          props.setlist(newList)
        }
      })
    }

    return (
      <React.Fragment>
        <div
          role='button'
          onClick={(event) =>
            handleClickOpen(event, props.visitor, props.visited)
          }
        >
          <MoreIcon color='primary' />
        </div>
        <Dialog
          fullWidth
          maxWidth='sm'
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {props.element.userName}
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={2}
            >
              <Grid item xs={12} sm={9}>
                <Carousel autoPlay showThumbs={false}>
                  {props.element.images.split(',').length > 1
                    ? props.element.images.split(',').map((el, iKey) => {
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
              <Grid container item xs={8} sm={4}>
                <props.StyledBadge
                  overlap='circle'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant='dot'
                  status={props.status}
                >
                  <Avatar
                    aria-label='recipe'
                    src={`http://localhost:3001/${
                      props.element.images.split(',')[0]
                    }`}
                    alt={`test${props.element.images.split(',')[0]}`}
                  />
                </props.StyledBadge>
                {props.curTime && (
                  <Typography
                    variant='body2'
                    display='initial'
                    className={classes.date}
                  >
                    Last Seen {moment(props.curTime).fromNow()}
                  </Typography>
                )}
                <Typography className={classes.typo}>
                  {'  ' +
                    props.element.firstName +
                    ' ' +
                    props.element.lastName +
                    ', ' +
                    props.element.age +
                    ' '}
                  {props.element.gender === 'Male' && (
                    <FaMale style={{ color: 'green' }} />
                  )}
                  {props.element.gender === 'Women' && (
                    <FaFemale style={{ color: 'pink' }} />
                  )}
                </Typography>
                <Typography className={classes.typo1} variant='body2'>
                  {props.element.city +
                    ' | ' +
                    props.element.km.toFixed(2) +
                    '  km'}
                </Typography>
              </Grid>
              <Grid container item xs={8} sm={4}>
                {props.element.tag1.split(',').length > 0
                  ? props.element.tag1.split(',').map((el, iKey) => {
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
              <Grid item xs={8} sm={4}>
                <Typography color='primary' variant='caption'>
                  {props.element.bio}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={4}>
                {0 < props.element.fameRating && props.element.fameRating < 50 && (
                  <Typography style={{ color: 'Gold' }} variant='caption'>
                    <Rating
                      style={{ pointerEvents: 'none' }}
                      initialRating={1}
                    />
                    <br />
                    {props.element.fameRating + ' exp Useless'}
                  </Typography>
                )}
                {50 < props.element.fameRating &&
                  props.element.fameRating < 150 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={1}
                      />
                      <br />
                      {props.element.fameRating + ' exp Useless+'}
                    </Typography>
                  )}
                {150 < props.element.fameRating &&
                  props.element.fameRating < 250 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={2}
                      />
                      <br />
                      {props.element.fameRating + ' exp Poor'}
                    </Typography>
                  )}
                {250 < props.element.fameRating &&
                  props.element.fameRating < 350 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={2}
                      />
                      <br />
                      {props.element.fameRating + ' exp Poor+'}
                    </Typography>
                  )}
                {350 < props.element.fameRating &&
                  props.element.fameRating < 450 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={3}
                      />
                      <br />
                      {props.element.fameRating + ' exp Ok'}
                    </Typography>
                  )}
                {450 < props.element.fameRating &&
                  props.element.fameRating < 550 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={3}
                      />
                      <br />
                      {props.element.fameRating + ' exp Ok+'}
                    </Typography>
                  )}
                {550 < props.element.fameRating &&
                  props.element.fameRating < 650 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={4}
                      />
                      <br />
                      {props.element.fameRating + ' exp Good'}
                    </Typography>
                  )}
                {650 < props.element.fameRating &&
                  props.element.fameRating < 750 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={4}
                      />
                      <br />
                      {props.element.fameRating + ' exp Good+'}
                    </Typography>
                  )}
                {750 < props.element.fameRating &&
                  props.element.fameRating < 850 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={5}
                      />
                      <br />
                      {props.element.fameRating + ' exp Excellent'}
                    </Typography>
                  )}
                {850 < props.element.fameRating &&
                  props.element.fameRating < 1001 && (
                    <Typography style={{ color: 'Gold' }} variant='caption'>
                      <Rating
                        style={{ pointerEvents: 'none' }}
                        initialRating={5}
                      />
                      <br />
                      {props.element.fameRating + ' exp Excellent+'}
                    </Typography>
                  )}
              </Grid>
              <Grid container item xs={8} sm={4} direction='row'>
                <IconButton
                  aria-label='Block User'
                  onClick={(event) => handelBlock(event)}
                >
                  <BlockIcon />
                </IconButton>
                <Report visitor={props.visitor} visited={props.visited} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color='primary'>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
}

export default CustomizedDialogs