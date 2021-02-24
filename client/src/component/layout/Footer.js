import React from 'react'
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(2, 1),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

const Footer = (props) => {
    const classes = useStyles(props);
    return  <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © Matcha '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </footer>
}

export default Footer