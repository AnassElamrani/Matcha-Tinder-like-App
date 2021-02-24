import React from 'react';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { Button, Dialog, Typography, IconButton, CardMedia } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Close as CloseIcon, More as MoreIcon } from '@material-ui/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
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
    height: '60vh'
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
            <Typography gutterBottom>
              Full Name :{' '}
              {' ' + props.element.firstName + ' ' + props.element.lastName}
            </Typography>
            <Typography>Biography : {props.element.bio}</Typography>
            <Typography>Age : {props.element.age}</Typography>
            <Typography>
              Distance : {props.element.km.toFixed(2) + '  km'}
            </Typography>
            <Typography>Gender : {props.element.gender}</Typography>
            <Typography>City : {props.element.city}</Typography>
            <Typography>
              Fame Rating : {props.element.fameRating + '  exp'}
            </Typography>
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
                        {/* <img src={srcImg} alt={altImg} /> */}
                        <p>{altImg}</p>
                      </div>
                    )
                  })
                : ''}
            </Carousel>
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