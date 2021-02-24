import React from 'react'
import { Icon } from '@material-ui/core'
import google from '../../assets/images/icons8-google.svg'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    imageIcon: {
        height: '100%'
    },
    iconRoot: {
        textAlign: 'center'
    }
}));

const Icons = () => {
    const classes = useStyles()
    return <Icon className={classes.iconRoot}>
            <img className={classes.imageIcon} src={google} alt="iconGoogle"/>
        </Icon>
}

export default Icons