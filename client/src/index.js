import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Axios from 'axios'
// we should use route instead of using BrowserRoute.
import { Router }from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './start/theme'
import history from './history/history'


Axios.defaults.baseURL = "http://localhost:3001/"
// Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));