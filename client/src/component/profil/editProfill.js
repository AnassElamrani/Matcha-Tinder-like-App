import React from 'react'
import PropTypes from "prop-types";
import {Tab, AppBar, Box, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Geo from "./geo"
import EditImages from "./myAddImages"
import EditPassword from "../forget/editPassword"
import Profil from './profil'
import IdContext from "../../start/IdContext"

const useStyles = makeStyles((theme) => ({
  diva: {
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  root1: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const EditProfil = (props) => {
  const classes = useStyles(props)
  const [value, setValue] = React.useState(0)
  const globalId = React.useContext(IdContext)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.diva}>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='tabs edit profil'
          >
            <Tab label='Profil' {...a11yProps(0)} />
            <Tab label='Images' {...a11yProps(1)} />
            <Tab label='Password' {...a11yProps(2)} />
            <Tab label='Localization' {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Profil id={globalId} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditImages id={globalId} stop={true} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditPassword id={globalId} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Geo id={globalId} />
        </TabPanel>
      </div>
    </div>
  )
}

export default EditProfil
