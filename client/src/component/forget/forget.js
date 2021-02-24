import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import Size from '../helpers/size'
import history from '../../history/history'

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
    const [errMsg, setErr] = useState('')
    const [newPassword, setPass] = useState('')
    const [cnfrmPassword, setCnfPass] = useState('')
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (valid) history.push('/Login')
    })
    const forget = (e, id) => {
        e.preventDefault();
        Axios.post(`users/forget/${id}`, {
            newPassword: newPassword,
            cnfrmPassword: cnfrmPassword
        }).then((res) => {
            if (res.data.msg)
                setErr(res.data.msg)
            else if (res.data.status === "success")
                setValid(!valid)
        })
    }
    return (
      <Size>
        <Container className={classes.copy} component='main' maxWidth='xs'>
          <Typography className={classes.typo} component='h1' variant='h5'>
            Change Password .
          </Typography>
          <div className={classes.paper}>
            <form method='POST' onSubmit={(event) => forget(event, props.match.params.frgId) }>
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
                    label='Password'
                    type='password'
                    id='inputPassword'
                    autoFocus
                    autoComplete='current-password'
                    onChange={(e) => setPass(e.target.value)}
                    value={newPassword}
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
                    autoComplete='current-password'
                    label='Confirm Password'
                    onChange={(e) => setCnfPass(e.target.value)}
                    value={cnfrmPassword}
                  />
                </Grid>
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