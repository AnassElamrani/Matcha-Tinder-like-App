import React from 'react'
import Axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Collapse, Button, Dialog, Typography, IconButton } from '@material-ui/core'
import { useMapEvents, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Alert } from "@material-ui/lab";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
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

const Geo = (props) => {
    const [open, setOpen] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [position, setPosition] = React.useState(null)
    const [city, setCity] = React.useState(null)
    const  zoom = 8
    const location = [33.562, -7.36126]
    const handleClickOpen = (e) => {
      setOpen(true)
    }

    const handleClose = (e) => {
      setOpen(false);
    }

    const handelDone = (e, position, city) => {
      setOpen1(true);
      setOpen(false);
    }


    const LocationMarker = (props) => {
      const [position, setPosition] = React.useState(null)
      const [city, setCity] = React.useState(null)
      useMapEvents({
        click: (e) => {
          // initialaza variable state
          setCity(null)
          setPosition(e.latlng)
        },
      });

      const f = React.useCallback(async () => {
        if (position !== null) {
          await Axios.post(`/base/updateGeo/${props.id}`, { latlng: position }).then(
            (res) => {
              if (res.data !== "") {
                setCity(res.data);
              }
            }
          );
        }
      }, [position, props]);

      React.useEffect(() => {
        f()
      }, [f])
      return position === null ? null : (
        <Marker position={position}>
          <Popup>{city && city}</Popup>
        </Marker>
      )
    }
     React.useEffect(() => {
       const interval = setInterval(() => {
         if (open1)
           setOpen1(false);
       }, 1500);
       return () => clearInterval(interval);
     });

    return (
      <React.Fragment>
        <Collapse in={open1}>
          <Alert severity="success">Localization have been updated</Alert>
        </Collapse>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Edit Your Position
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Maps
          </DialogTitle>
          <DialogContent dividers>
            {/* add map here */}
            <Typography>Choose with your mouse a position :</Typography>
            <MapContainer center={location} zoom={zoom} Icon={Icon}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker id={props.id} p={setPosition} c={setCity} />
            </MapContainer>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={(event) => handelDone(event, position, city)}
              color="primary"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}


export default Geo;