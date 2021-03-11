import React, { useEffect } from "react";
import Axios from "axios";
import { makeStyles} from '@material-ui/core/styles'
import { Container, CircularProgress } from '@material-ui/core'
import history from "../../history/history";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginTop: 20
  },
}))

const Valid  = (props) => {
  const classes = useStyles()
  const [verify, setVerify] = React.useState(false)

  useEffect(() => {
    Axios.get(`users/confirm/${props.match.params.cnfId}`).then((response) => {
      let { status } = response.data
      if (status === 'succes') setVerify(true)
      else if (status === 'verify') setVerify(true)
    })

    if (verify) history.push('/Login')
  }, [props, verify])
  return (
    <React.Fragment>
      <Container className={classes.root} maxWidth='sm'>
        <CircularProgress />
      </Container>
    </React.Fragment>
  )
}

export default Valid;