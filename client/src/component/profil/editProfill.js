import React from 'react'
import Axios from 'axios'
import { Button, TextField } from "@material-ui/core";
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import history from '../../history/history'
import Geo from "./geo"
const instance = Axios.create({ withCredentials: true })

const useStyles = makeStyles((theme) => ({

}))

const EditProfil = (props) => {

  const classes = useStyles(props);
  const [data, setData] = React.useState({
    id: '',
    oauth_id: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: ''
  })
  const [errMsg, setErrMsg] = React.useState("")
  const [status, setStatus] = React.useState()
  const [f, setF] = React.useState(false)
  const [check, setCheck] = React.useState(false)

  const edit = (e, id) => {
    e.preventDefault()
    Axios.post(`base/editprofil/${id}`, {
      userName: data.userName,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio
    })
      .then((res) => {
        if (res.data.input) {
          setErrMsg(res.data.input)
          setF(true)
        }
        else setErrMsg({ validUserNameErr: undefined, validEmailErr: undefined, validFirstNameErr: undefined, validLastNameErr: undefined, validBio: undefined})
        if (res.data.status) {
          setStatus(!status)
          setF(false)
          // history.push('/about')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handelInput = (e) => {
    // syntac to onchange all value in object  
    // setValues(old => { ...old, [name]: value })
    setData(data => ({ ...data ,[e.target.name]: e.target.value}))
  };

  React.useEffect(() => {
    Axios.post(`/base/check/${props.match.params.id}`).then(async (res) => {
      if (res.data.status) await setCheck(true)
    })
    if (check) history.push('/')
    else{
      instance
        .get('http://localhost:3001/base')
        .then((res) => {
          setData(res.data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [props.match.params.id, check])
  return (
    <React.Fragment>
      <form
        method='POST'
        onSubmit={(event) => edit(event, data.id)}
      >
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='inputUserName'
          label='User Name'
          name='userName'
          autoComplete='userName'
          autoFocus
          onChange={handelInput}
          value={data.userName}
          helperText={errMsg.validUserNameErr}
          error={errMsg.validUserNameErr !== undefined}
        />
        <TextField
          variant='outlined'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          onChange={handelInput}
          value={data.email}
          helperText={errMsg.validEmailErr}
          error={errMsg.validEmailErr !== undefined}
        />
        <TextField
          autoComplete='fname'
          name='firstName'
          variant='outlined'
          required
          fullWidth
          id='inputFirstName'
          label='First Name'
          autoFocus
          onChange={handelInput}
          value={data.firstName}
          helperText={errMsg.validFirstNameErr}
          error={errMsg.validFirstNameErr !== undefined}
        />
        <TextField
          variant='outlined'
          required
          fullWidth
          id='inputLastName'
          label='Last Name'
          name='lastName'
          autoComplete='lname'
          autoFocus
          onChange={handelInput}
          value={data.lastName}
          helperText={errMsg.validLastNameErr}
          error={errMsg.validLastNameErr !== undefined}
        />
        <TextField
          label='Biography'
          name='bio'
          multiline
          rows={3}
          variant='outlined'
          onChange={handelInput}
          value={data.bio}
          helperText={errMsg.validBio}
          error={errMsg.validBio !== undefined}
        />
        {status ? (
                  <Alert severity='success'>Update Complet</Alert>
                ) : (
                  f && <Alert severity='error'>Solve Error</Alert>
                )}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Edit
        </Button>
      </form>
      <Geo id={data.id} />
    </React.Fragment>
  )
}

export default EditProfil
