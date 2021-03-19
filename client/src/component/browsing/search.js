import React from 'react'
import Axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {TextField, Chip, Slider, Button, Dialog, Typography, IconButton, 
  DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Autocomplete from '@material-ui/lab/Autocomplete';

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

function valuetext(value) {
  return `${value} - Old`
}

function fametext(rating) {
  return `${rating} - Fame`
}

function geoText(geo) {
  return `${geo} - Localisation`
}

const Search = (props) => {
  const [value, setValue] = React.useState([18, 60])
  const [rating, setRating] = React.useState(1000)
  const [geo, setGeo] = React.useState(100)
  const [tag, setTag] = React.useState([])
  const [tag1, setTag1] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [didMount, setDidMount] = React.useState(false)

  const handleClickOpen = (e) => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
    setTag1([])
  }

  const handelDone = (e) => {
    handleClose()
  }

  const kit3awad = () => {
    Axios.post(`/browsing/search/${props.id}`, {
      cord: props.cord,
      gender: props.gender,
      value: value,
      rating: rating,
      geo: geo,
      tag: tag1
    }).then((res) => {
      if (res.data) {
        props.setList(res.data)
        props.setList1(res.data)
      }
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChange1 = (event, newValue) => {
    setGeo(newValue)
  }

  const handleChange2 = (event, newValue) => {
    setRating(newValue)
  }

  const handleTag = (event, newValue) => {
    setTag1(newValue)
  }

  React.useEffect(() => {
    Axios.post(`base/alltag/${props.id}`).then((res) => {
      if (res.data)
        setTag(res.data)
    })
    setDidMount(true);
    return () => setDidMount(false);
  }, [props])

  if (!didMount)
    return null
    
  return (
    <React.Fragment>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Search
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Search
        </DialogTitle>
        <DialogContent dividers>
          <Typography id='range-slider' gutterBottom>
            Age Filter :
          </Typography>
          <Slider
            min={18}
            max={60}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            getAriaValueText={valuetext}
          />

          <Typography id='range-slider2' gutterBottom>
            Location :
          </Typography>
          <Slider
            min={0}
            max={100}
            value={geo}
            onChange={handleChange1}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider2'
            getAriaValueText={geoText}
          />

          <Typography id='range-slider1' gutterBottom>
            Fame Filter :
          </Typography>
          <Slider
            min={0}
            max={1000}
            value={rating}
            onChange={handleChange2}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider1'
            getAriaValueText={fametext}
          />
          <Autocomplete
            multiple
            id='size-small-filled-multi'
            size='small'
            options={tag}
            onChange={handleTag}
            getOptionSelected={(option) => option.key === 0}
            getOptionLabel={(option) => option.name}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant='outlined'
                  label={option.name}
                  size='small'
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='tags'
                placeholder='Enter your favorite tags'
              />
            )}
          />
          <Button
            autoFocus
            onClick={kit3awad}
            color='secondary'
            variant='outlined'
          >
            Search gab
          </Button>
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


export default Search;
