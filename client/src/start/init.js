import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
import Login from "../component/auth/Login";
import Signup from "../component/auth/Sign-in";
import Valid from "../component/auth/Valid";
import SendForget from "../component/forget/sendForget";
import Forget from "../component/forget/forget";
import ResponsiveDrawer from "../component/layout/res/ResponsiveDrawer";
import SocketContext from './SocketContext'
import { io } from 'socket.io-client'
const URL = 'http://localhost:3001'

const socket = io(URL)

const Init = (props) => {
  const [loggedin, setLoggedin] = useState(false)
  const [lay3awn, setLay3awn] = React.useState(false)

  const login = () => {
    setLoggedin(!loggedin);
  };
  const logout = () => {
    setLoggedin(false)
    setLay3awn(false)
  };

  const CancelToken = Axios.CancelToken
  const source = CancelToken.source()

  const checkLogin = React.useCallback(async () => {
    await Axios.get("http://localhost:3001/users/checkLogin", {
      withCredentials: true,
      cancelToken: source.token
    })
      .then((response) => {
        if (response.data.access === "Granted" && response.data.jwt)
          setLoggedin(true)
        else
          setLoggedin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [source])

  useEffect(() => {
    checkLogin()
    return () => {
      if (source)
        source.cancel("init")
    }
  }, [checkLogin, source]);

  return (
    <React.Fragment>
      {loggedin === false ? (
        <Switch>
          <Route exact path='/Sign-up' component={Signup} />
          <Route path='/Login' component={() => <Login login={login} />} />
          <Route path='/confirm/:cnfId' component={Valid} />
          <Route path='/sendForget' component={SendForget} />
          <Route path='/forget/:frgId' component={Forget} />
          <Route path='/*' component={() => <Login login={login} />} />
        </Switch>
      ) : (
        <SocketContext.Provider value={socket}>
          <ResponsiveDrawer
            logout={logout}
            loggedin={loggedin}
            lay3awn={lay3awn}
            setLay3awn={setLay3awn}
          />
        </SocketContext.Provider>
      )}
    </React.Fragment>
  )
}

export default Init;