import React, { Component } from "react";
import Axios from "axios";
import "../../start/styles.css"
import IntraSvg from "../../start/IntraSvg";
import {
  Hidden,
  Checkbox,
  FormControlLabel,
  // LockOutlinedIcon,
  Avatar,
  // CssBaseline,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { withStyles} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import history from "../../history/history";
const instance = Axios.create({ withCredentials: true });

// import imgMatcha from '../../assets/images/img.png';

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
    // border: "1px solid lightgray",
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
    height: "14%",
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

class Login extends Component {
  state = {
    errMsg: {},
    userName: "",
    password: "",
    redirect: null,
    data: [],
    disabled: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async (e) => {
    e.preventDefault();
    await instance
      .post("http://localhost:3001/users/login", {
        userName: this.state.userName,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data.status === "fail")
          this.setState({ errMsg: response.data.toSend });
        else if (response.data.status === "success" && response.data.verified === false) {
          this.setState({ errMsg: response.data.toSend });
        }
        else if (response.data.status === "success" && response.data.verified === true) {
          this.setState({ redirect: "/" });
        }
      });
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/users/checkLogin", {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.jwt) this.setState({ redirect: "/" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.redirect) {
      this.props.login();
      history.push("/");
    }
  }

  render() {
    const { classes } = this.props;
    const img = {
      // src: "https://i.ibb.co/gSMgwQY/Group-1.png"
      src: "https://i.ibb.co/Dty8vRF/420e32dfc9a3a1778b273bd7310eb364.webp"
      // src : "https://i.ibb.co/BBbJVq8/dribble-4-15-4x.webp"
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
                      // variant="text"
                      startIcon={<IntraSvg />}
                    >
                      <Hidden only="xs">sign in with intra</Hidden>
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
                  <form method='POST' className={classes.form} onSubmit={this.login}>
                  <Typography variant='subtitle2' gutterBottom color='secondary'>
                    {this.state.errMsg.errorGlobal}
                  </Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="inputUserName"
                      label="User Name"
                      name="userName"
                      autoComplete="userName"
                      autoFocus
                      onChange={this.onChange.bind(this)}
                      value={this.state.userName}
                      helperText={this.state.errMsg.validUserNameErr}
                      error={this.state.errMsg.validUserNameErr !== undefined}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="inputPassword"
                      autoComplete="current-password"
                      onChange={this.onChange.bind(this)}
                      value={this.state.password}
                      helperText={this.state.errMsg.validPassErr}
                      error={this.state.errMsg.validPassErr !== undefined}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Login
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Typography variant="body2">
                          <Link to="/sendForget">Forgot password?</Link>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          <Link to="/Sign-up">
                            "Don't have an account? Sign Up"
                          </Link>
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

export default withStyles(styles)(Login);
