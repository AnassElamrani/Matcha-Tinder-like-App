import React, { Component } from 'react'
import Axios from 'axios'
import "../../start/styles.css"
import IntraSvg from "../../start/IntraSvg";
import {
  Hidden,
  Checkbox,
  FormControlLabel,
  Avatar,
  // CssBaseline,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles'
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import history from '../../history/history'
// import Size from '../helpers/size'

const styles = theme => ({
  buttonOauth: {
    margin: theme.spacing(1),
    color: "grey",
    border: "0",
    backgroundColor: "#f7f7f7",
    textTransform: "capitalize"
  },
  intra: {
    fontFamily: "Comfortaa",
    fontSize: "12px",
    margin: theme.spacing(1),
    color: "#383838",
    backgroundColor: "#f7f7f7",
    textTransform: "capitalize"
  },
  oauth: {
    display: "flex",
    flexDirection: "row",
    margin: "15px"
  },
  diva: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: "100vh",
    overflowY: "hidden"
  },
  container: {
    // height: 100
    fontFamily: "Comfortaa"
  },
  grides: {
    height: 100
  },
  boxes: {
    // border: "1px black solid",
    height: "100vh"
  },
  img: {
    // object-fit: 'cover',
    width: "100%",
    height: "100%"
  },
  Gflex: {
    display: "flex",
    flexDirection: "column"
  },

  paper: {
    margin: theme.spacing(6, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5A9798"
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  hadik: {
    // minWidth: "100%"
  },
  top: {
    backgroundColor: "white",
    height: "6%",
    margin: 0
    // border: "1px solid gray"
  },
  matcha: {
    color: "#0d0c22",
    textAlign: "center",
    fontFamily: "Comfortaa"
  },
  find: {
    color: "#1e1731",
    textAlign: "center",
    fontFamily: "Comfortaa"
  },
  or: {
    width: "80%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    /* background-color: lightgray; */
    color: "#9c9c9c"
  },
  leftline: {
    position: "absolute",
    height: "1px",
    width: "36%",
    left: "55%",
    top: "7px",
    backgroundColor: "lightgray"
  },

  rightline: {
    position: "absolute",
    height: "1px",
    width: "36%",
    right: "55%",
    top: "7px",
    backgroundColor: "lightgray"
  },
  boxeflex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

class Signup extends Component {
  state = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    cnfrmPassword: '',
    errMsg: {},
    redirect: null,
    valid: false,
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  signup = (e) => {
    e.preventDefault()
    Axios.post('users/signup', {
      email: this.state.email,
      userName: this.state.userName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      cnfrmPassword: this.state.cnfrmPassword,
    }).then((response) => {
      this.setState({ errMsg: response.data })
      if (response.data.status === 'success') this.setState({ valid: true })
    })
  }

  componentDidMount() {
    Axios.get('http://localhost:3001/users/checkLogin', {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.jwt) this.setState({ redirect: '/' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidUpdate() {
    if (this.state.redirect) history.push('/')
    if (this.state.valid) history.push('/Login')
  }

  render() {
    const concat1 =
      this.state.errMsg.emailErr === undefined &&
      this.state.errMsg.validEmailErr === undefined
        ? ''
        : `${this.state.errMsg.emailErr} ${this.state.errMsg.validEmailErr}`.replace(
            'undefined',
            ''
          )
    const concat2 =
      this.state.errMsg.userNameErr === undefined &&
      this.state.errMsg.validUserNameErr === undefined
        ? ''
        : `${this.state.errMsg.userNameErr} ${this.state.errMsg.validUserNameErr}`.replace(
            'undefined',
            ''
          )
    const concat3 =
      this.state.errMsg.passErr === undefined &&
      this.state.errMsg.validCnfpErr === undefined
        ? ''
        : `${this.state.errMsg.passErr} ${this.state.errMsg.validCnfpErr}`.replace(
            'undefined',
            ''
          )
    const { classes } = this.props
    const img = {
      // src: "https://i.ibb.co/gSMgwQY/Group-1.png"
      // src: "https://i.ibb.co/Dty8vRF/420e32dfc9a3a1778b273bd7310eb364.webp"
      src : "https://i.ibb.co/BBbJVq8/dribble-4-15-4x.webp"
      // src : "https://i.ibb.co/f8xZsbq/dribble-4-11-4x.webp"
    };
    return (
<div className={classes.diva}>
    <Grid container className={classes.container}>
      <Hidden only={["xs", "sm"]}>
        <Grid item className={classes.Gflex} md={4}>
          <Box bgcolor="#ffffff" className={classes.boxeflex} flexGrow={2}>
          </Box>
          <Box flexGrow={8}>
            <img className={classes.img} src={img.src} alt="img" />
          </Box>
          <Box flexGrow={3} bgcolor="#ffffff" className={classes.boxeflex}>
          </Box>
        </Grid>
      </Hidden>
      <Grid container item md={8}>
        <Hidden only="xs">
          <Grid className={classes.top} container item>
            {/* <Box>ssxc</Box> */}
          </Grid>
        </Hidden>
        <Hidden only="xs">
          <Grid item sm={2}>
            <Box bgcolor="white" className={classes.boxes}></Box>
          </Grid>
        </Hidden>
        <Grid className={classes.hadik} item sm={8}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography
              className={classes.matcha}
              component="h1"
              variant="h6"
            >
              Sign in to Matcha
            </Typography>
            <div className={classes.oauth}>
              <Button
              href="http://localhost:3001/auth/42"
                className={classes.intra}
                startIcon={<IntraSvg />}
              >
                <Hidden only="xs">sign up with intra</Hidden>
              </Button>
              <Button
                size="large"
                href="http://localhost:3001/auth/facebook"
                className={classes.buttonOauth}
                variant="outlined"
              >
                <FaFacebookF />
              </Button>
              <Button
                size="large"
                href="http://localhost:3001/auth/google"
                className={classes.buttonOauth}
                variant="outlined"
              >
                <FaGoogle />
              </Button>
            </div>
            <div className={classes.or}>
              <div className={classes.leftline}></div>
              <div>Or</div>
              <div className={classes.rightline}></div>
            </div>
    <form className={classes.form} method='POST' onSubmit={this.signup}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete='uname'
            name='userName'
            variant='outlined'
            required
            fullWidth
            id='inputUserName'
            label='User Name'
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.userName}
            helperText={concat2}
            error={
              this.state.errMsg.userNameErr !== undefined ||
              this.state.errMsg.validUserNameErr !== undefined
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete='fname'
            name='firstName'
            variant='outlined'
            required
            fullWidth
            id='inputFirstName'
            label='First Name'
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.firstName}
            helperText={this.state.errMsg.validFirstNameErr}
            error={this.state.errMsg.validFirstNameErr !== undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            required
            fullWidth
            id='inputLastName'
            label='Last Name'
            name='lastName'
            autoComplete='lname'
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.lastName}
            helperText={this.state.errMsg.validLastNameErr}
            error={this.state.errMsg.validLastNameErr !== undefined}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.email}
            helperText={concat1}
            error={
              this.state.errMsg.emailErr !== undefined ||
              this.state.errMsg.validEmailErr !== undefined
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='inputPassword'
            autoComplete='current-password'
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.password}
            helperText={this.state.errMsg.validPassErr}
            error={this.state.errMsg.validPassErr !== undefined}
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
            autoFocus
            onChange={this.onChange.bind(this)}
            value={this.state.cnfrmPassword}
            helperText={concat3}
            error={
              this.state.errMsg.passErr !== undefined ||
              this.state.errMsg.validCnfpErr !== undefined
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox value='allowExtraEmails' color='primary' />
            }
            label='I want to receive notification and updates via email.'
          />
        </Grid>
      </Grid>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify='flex-end'>
        <Grid item>
          <Typography variant='body2'>
            <a href='/Login'>Already have an account? Sign in</a>
          </Typography>
        </Grid>
      </Grid>
    </form>
    </div>
          </Grid>
          <Hidden only="xs">
            <Grid item sm={2}>
              <Box className={classes.boxes} bgcolor="white"></Box>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default withStyles(styles)(Signup)
