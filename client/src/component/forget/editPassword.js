import React from 'react'
import Axios from 'axios'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import Size from '../helpers/size'

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  typo: {
    margin: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'green',
  },
}))


const Forget = (props) => {
    const classes = useStyles(props)
    const [errMsg, setErr] = React.useState('')
    const [inputErr, setInputErr] = React.useState('')
    const [oldPassword, setOldPass] = React.useState('')
    const [newPassword, setPass] = React.useState('')
    const [cnfrmPassword, setCnfPass] = React.useState('')
    const [valid, setValid] = React.useState(false)

    const forget = (e, id) => {
        e.preventDefault();
        Axios.post(`users/edit/${id}`, {
            password: oldPassword,
            newPassword: newPassword,
            cnfrmPassword: cnfrmPassword
        }).then((res) => {
          console.log(res.data)
            if (res.data.input)
              setInputErr(res.data.input)
            else
              setInputErr('')
            if (res.data.msg)
              setErr(res.data.msg)
            else
              setErr('')
            if (res.data.status === "success")
              setValid(true)
            else
              setValid(false)
        })
    }
    return (
      <Size>
        <Container className={classes.copy} component='main' maxWidth='xs'>
          <Typography className={classes.typo} component='h1' variant='h5'>
            Change Password 
          </Typography>
          <div className={classes.paper}>
            <form method='POST' onSubmit={(event) => forget(event, props.id) }>
              <Grid container spacing={2}>
                <Typography variant='subtitle2' gutterBottom color='secondary'>
                  {errMsg}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Old password'
                    type='password'
                    id='inputOldPassword'
                    autoFocus
                    autoComplete='current-password'
                    onChange={(e) => setOldPass(e.target.value)}
                    value={oldPassword}
                    helperText={inputErr.validPassErr}
                    error={inputErr.validPassErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='inputPassword'
                    autoFocus
                    autoComplete='new-password'
                    onChange={(e) => setPass(e.target.value)}
                    value={newPassword}
                    helperText={inputErr.validNewpErr}
                    error={inputErr.validNewpErr !== undefined}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='cnfrmPassword'
                    type='password'
                    id='inputCnfrmPassword'
                    autoComplete='new-password'
                    label='Confirm Password'
                    onChange={(e) => setCnfPass(e.target.value)}
                    value={cnfrmPassword}
                    helperText={inputErr.validCnfpErr}
                    error={inputErr.validCnfpErr !== undefined}
                  />
                </Grid>
                {valid === true && <Alert severity='success'>Update Complet</Alert>}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='outlined'
                className={classes.submit}
              >
                Change password
              </Button>
            </form>
          </div>
        </Container>
      </Size>
    )
}

export default Forget