import React from 'react';
import Axios from 'axios'
import { FormControlLabel, FormControl, FormLabel, Grid, Button, 
    TextField, Radio, RadioGroup, Select, MenuItem, InputLabel, FormHelperText,
    Collapse, Chip, Paper, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import history from '../../history/history'
const instance = Axios.create({ withCredentials: true })

const useStyles = makeStyles((theme) => ({
  diva: {
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  root1: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
}))

const Profil = (props) => {
    const classes = useStyles(props)
    const [data, setData] = React.useState({
      id: '',
      oauth_id: '',
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      bio: '',
    })
    const [errMsg, setErrMsg] = React.useState('')
    const [status, setStatus] = React.useState()
    const [f, setF] = React.useState(false)
    const [check, setCheck] = React.useState(false)
    const [value1, setValue1] = React.useState('male')
    const [type, setType] = React.useState('women')
    const [age, setAge] = React.useState([])
    const [age1, setAge1] = React.useState('')
    const [tag, setTag] = React.useState('')
    const [chipData, setChipData] = React.useState([])
    const [chipData1, setChipData1] = React.useState([])

    const [dsbl, setDsbl] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const [open1, setOpen1] = React.useState(true)
    const [errTag, setErrTag] = React.useState('')
    const [didMount, setDidMount] = React.useState(false)
    const [emailStatus, setEmailStatus] = React.useState(false)

    React.useEffect(() => {
      setAge(range(18, 60))
      Axios.post(`base/alltag/${props.id}`).then((res) => {
        if (res.data) setChipData(res.data)
      })
      Axios.post(`users/outh/${props.id}`).then((res) => {
        res.data ? setEmailStatus(res.data) : setEmailStatus(res.data)
      });
    }, [props])

    const edit = async (e, id) => {
      e.preventDefault()
      await Axios.post(`base/editprofil/${id}`, {
        userName: data.userName,
        ...(!emailStatus ? { email: data.email } : {}),
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        gender: value1,
        type: type,
        age: age1,
        tag: chipData,
        tag1: chipData1,
      })
        .then((res) => {
          if (res.data.input) {
            setErrMsg(res.data.input);
            setF(true);
          } else
            setErrMsg({
              validUserNameErr: undefined,
              validEmailErr: undefined,
              validFirstNameErr: undefined,
              validLastNameErr: undefined,
              validBio: undefined,
            });
          if (res.data.status) {
            setStatus(true);
            setF(false);
          } else {
            setStatus(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const handelInput = (e) => {
      // syntac to onchange all value in object
      // setValues(old => { ...old, [name]: value })
      setData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    React.useEffect(() => {
      Axios.post(`/base/check/${props.id}`).then(async (res) => {
        if (res.data.status) await setCheck(true)
      })
      if (check) history.push('/')
      else {
        instance
          .get('http://localhost:3001/base')
          .then((res) => {
            setData(res.data.user)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }, [props.id, check])

    const range = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx)
    }

    const handleChange1 = (event) => {
      setAge1(event.target.value)
    }

    const addToOption = (tag) => {
      if (errTag === '') {
        var id
        Object.keys(chipData).length === 0
          ? (id = 1)
          : (id = chipData.slice(-1)[0].key + 1)
        chipData.push({ key: id, name: tag })
      }
    }

    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) =>
        chips.filter((chip) => chip.key !== chipToDelete.key)
      )
      setChipData1((data) => [...data, chipToDelete])
    }

    const handelTag = (e) => {
      setTag(e.target.value)
      if (tag.match(/^#([A-Za-z0-9_]){3,25}$/) === null) {
        setErrTag('Enter a valid tag')
        setDsbl(true)
      } else {
        setErrTag('')
        setDsbl(false)
      }
    }

    React.useEffect(() => {
      if (data.gender !== undefined && data.type !== undefined) {
        setAge1(data.age)
        setValue1(data.gender.toLowerCase())
        setType(data.type.toLowerCase())
      }
      setDidMount(true)
      return () => setDidMount(false)
    }, [data])

    if (!didMount) return null
    return (
      <React.Fragment>
        <Grid
          container
          justify="center"
          alignItems="center"
          // direction='column'
        >
          <form method="POST" onSubmit={(event) => edit(event, data.id)}>
            <Grid item xs={12} sm={8}>
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
                onChange={handelInput}
                value={data.userName}
                helperText={errMsg.validUserNameErr}
                error={errMsg.validUserNameErr !== undefined}
              />
              {!emailStatus && (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handelInput}
                  value={data.email}
                  helperText={errMsg.validEmailErr}
                  error={errMsg.validEmailErr !== undefined}
                />
              )}
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="inputFirstName"
                label="First Name"
                autoFocus
                onChange={handelInput}
                value={data.firstName}
                helperText={errMsg.validFirstNameErr}
                error={errMsg.validFirstNameErr !== undefined}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="inputLastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                autoFocus
                onChange={handelInput}
                value={data.lastName}
                helperText={errMsg.validLastNameErr}
                error={errMsg.validLastNameErr !== undefined}
              />
              <TextField
                label="Biography"
                name="bio"
                multiline
                rows={3}
                variant="outlined"
                onChange={handelInput}
                value={data.bio}
                helperText={errMsg.validBio}
                error={errMsg.validBio !== undefined}
              />
              <Grid item xs={12}>
                <FormControl
                  className={classes.formControl}
                  error={errMsg.validAge !== undefined}
                >
                  <InputLabel id="demo-simple-select-required-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={age1}
                    onChange={handleChange1}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {age.map((el, key) => {
                      return (
                        <MenuItem key={key} value={el}>
                          {el}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{errMsg.validAge}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="gender1"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  >
                    <FormControlLabel
                      value="women"
                      control={<Radio />}
                      label="Women"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sexual preferences</FormLabel>
                  <RadioGroup
                    row
                    aria-label="type"
                    name="type1"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <FormControlLabel
                      value="women"
                      control={<Radio />}
                      label="Women"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Collapse in={open}>
                  <TextField
                    label="Add New Tag"
                    multiline
                    variant="outlined"
                    value={tag}
                    onChange={(e) => handelTag(e)}
                    helperText={errTag}
                    error={errTag !== ""}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setOpen(false);
                      setOpen1(true);
                      addToOption(tag);
                    }}
                    disabled={dsbl}
                  >
                    Add
                  </Button>
                </Collapse>
                <Collapse in={open1}>
                  <Button
                    disabled={open}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setOpen(true);
                      setOpen1(false);
                    }}
                  >
                    New Tag
                  </Button>
                </Collapse>
                <Paper component="ul" className={classes.root1}>
                  {chipData &&
                    chipData.map((data) => {
                      return (
                        <li key={data.key}>
                          <Chip
                            label={data.name}
                            onDelete={handleDelete(data)}
                            className={classes.chip}
                          />
                        </li>
                      );
                    })}
                  <Typography color="secondary">
                    {chipData && errMsg.validTag}
                  </Typography>
                </Paper>
              </Grid>
              {status ? (
                <Alert severity="success">Update Complet</Alert>
              ) : (
                f && <Alert severity="error">Solve Error</Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit
              </Button>
            </Grid>
          </form>
        </Grid>
      </React.Fragment>
    );
}

export default Profil;