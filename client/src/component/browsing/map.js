import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  Avatar
} from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import { Icon } from 'leaflet'

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
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const Map = (props) => {
  const [open, setOpen] = React.useState(false)
  const [position, setPosition] = React.useState([])
  const zoom = 9
  const location = position

  const handleClickOpen = (e) => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  const handelDone = (e) => {
    setOpen(false)
  }

    React.useEffect(() => {
      if (props.list[0]) setPosition([props.list[0].lat, props.list[0].long])
    }, [props.list])


  return (
    <React.Fragment>
      <Button variant='outlined' color='secondary' onClick={handleClickOpen}>
        Show users in map
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Maps
        </DialogTitle>
        <DialogContent dividers>
          {/* add map here */}
          <Typography>interactive map of users :</Typography>
          <MapContainer center={location} zoom={zoom} Icon={Icon}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {props.list &&
              props.list.map((el) => {
                const imageProfil = el.images.split(',')
                return (
                  <Marker key={el.id} position={[el.lat, el.long]}>
                    <Popup>
                      <Avatar
                        aria-label='recipe'
                        src={`http://localhost:3001/${imageProfil[0]}`}
                        alt={`test${imageProfil[0]}`}
                      ></Avatar>
                      <Typography color='primary'>
                        {el.userName + ' from ' + el.city}
                      </Typography>
                    </Popup>
                  </Marker>
                )
              })}
            <Circle
              center={position}
              pathOptions={{ color: 'red' }}
              radius={80000}
            />
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handelDone}
            color='primary'
            variant='outlined'
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Map