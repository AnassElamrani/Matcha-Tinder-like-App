import React from 'react'
import Axios from 'axios'
import {Container, Typography} from '@material-ui/core'
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid"
import moment from 'moment'

const History = (props) => {
    const [rowsData, setRows] = React.useState([])
    const rows: RowsProp = rowsData
    const columns: ColDef[] = [
        { field: "id", hide: true },
        { field: "col1", headerName: "UserName", width: 200 },
        { field: "col2", headerName: "Date visiting", width: 200 }
    ];

    React.useEffect(() => {
        Axios.post(`/browsing/getHistory/${props.match.params.id}`).then(res => {
            const fieldToAdd = res.data.map(el => {
                return ({id: el.id, col1: el.userName, col2: moment(el.created_at).fromNow()})
            })
            if (Object.keys(rowsData).length === 0)
                setRows([...rowsData, ...fieldToAdd])
        })
    }, [rowsData, props.match.params.id])
    return (
        <Container>
            <Typography display="block" align="center" gutterBottom component='h1' variant='h5'>History</Typography>

            <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </Container>
  );

}

export default History;