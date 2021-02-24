import React from 'react';
import { Grid } from '@material-ui/core'

const size = (props) => {
    return (
        <Grid item container>
            {/* remove xs={0} for error google ghrome */}
            <Grid item sm={2} />
            <Grid item xs={12} sm={8}>
                {props.children}
            </Grid>
            <Grid item sm={2} />
        </Grid>
    )
}

export default size;