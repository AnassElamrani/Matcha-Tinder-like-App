import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from '@material-ui/core'
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
  err: {
    margin: theme.spacing(2),
    textAlign: 'center',
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

/////// error click two time to get data from axios post ????????????

const SendForget = (props) => {
    const classes = useStyles(props)
    const [email, setEmail] = useState('')
    const [errMsg, setErr] = useState({})
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (valid) history.push('/Login')
        // else history.push('/Sign-up')
    })
    const forgetPassword = async (e) => {
        e.preventDefault()
        console.log("test")
        await Axios.post('users/sendForget', {
        email: email
        }).then((res) => {
          // 1 -first way to merge data
          // const err = res.data
          // setErr({...errMsg, ...res.data})

          // 2 -first way to merge data
          setErr((prevState) => {
            // Object.assign would also work
            return { ...prevState, ...res.data }
          })
          console.log(errMsg)
          if (errMsg.status === "success") setValid(!valid)
        })
    }

    return (
      <Size>
        <Container className={classes.copy} component='main' maxWidth='xs'>
          <Typography className={classes.typo} component='h1' variant='h5'>
            Reset your password.
          </Typography>
          <div className={classes.paper}>
            <Typography variant='h6'>
              Enter your user account's verified email address and we will send
              you a password reset link.
            </Typography>
            <form method='POST' onSubmit={forgetPassword}>
              <Grid container spacing={2}>
                <Typography className={classes.err} variant='subtitle2' gutterBottom color='secondary'>
                  {errMsg.validEmailErr}
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='email'
                    name='email'
                    variant='outlined'
                    required
                    fullWidth
                    id='idEmail'
                    label='Email'
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='outlined'
                className={classes.submit}
              >
                Send password reset email
              </Button>
            </form>
          </div>
        </Container>
      </Size>
    )
}

export default SendForget;