import React from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'

const Match = (props) => {
    const [lat, setLat] = React.useState(false)
    const [long, setLong] = React.useState(false)
    
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('with navigator')
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
    })

    React.useEffect(() => {
      const interval = setInterval(() => {
        if (lat === false && long === false){
          // Execute the created function directly
          Axios.get('https://api.ipify.org?format=json').then((res) => {
            // API TO GET IP OF THE USERS
            console.log(res);
            // API TO GET LAT AND LONG BY IP ADRESSE
            // Axios.get(
            //   `https://cors-anywhere.herokuapp.com/https://tools.keycdn.com/geo.json?host=${res.data.ip}`
            // ).then((res) => {
            //   console.log('with ip adress')
            //   setLat(res.data.data.geo.latitude)
            //   setLong(res.data.data.geo.longitude)
            // })
          })
        }
      }, 1000)
      return () => clearInterval(interval)
    }, [lat, long])

    // console.log(lat)


    const getlocalisation = async (e, id) => {
        e.preventDefault()
        Axios.post(`base/localisation/${id}`, {lat: lat, long: long })
    }

    return (
      <div>
        <form
          method='POST'
          onSubmit={(event) => getlocalisation(event, props.match.params.id)}
        >
          <Button
          type='submit'
            variant='contained'
            color='primary'
          >
            Get Localisation
          </Button>
        </form>
      </div>
    )
}

export default Match