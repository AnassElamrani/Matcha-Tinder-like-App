import React from 'react'
import Axios from 'axios'
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { Report as ReportIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}))

const FormDialog = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState();
  const [status, setStatus] = React.useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    if (props.statusImg)
      props.setOpen(true)
    else{
      setOpen(true)
      setStatus(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handelReport = () => {
    Axios.post(`report/${props.visitor}`, { reported: props.visited, feelback: value }).then(
      (res) => {
        if (res.data.status)
            setOpen(false);
        else
            setStatus(true)
      }
    )
  }



  return (
    <div>
      <IconButton
        color="primary"
        className={clsx(classes.expand)}
        aria-label='Report User'
        onClick={handleClickOpen}
      >
        <ReportIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Repert</DialogTitle>
        <DialogContent>
          {status && <Alert severity='error'>You can't achive this action</Alert>}
          <DialogContentText>
            {/* need soome update after */}
            Enter a feelback :
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='feedback'
            type='text'
            fullWidth
            multiline
            rowsMax={4}
            value={value}
            onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handelReport} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
