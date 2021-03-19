import React from 'react'
import Axios from 'axios'
import moment from 'moment'
import { Container, Typography } from '@material-ui/core'
import { DataGrid } from "@material-ui/data-grid"

const History = (props) => {
    const [rowsData, setRows] = React.useState([])
    const [didMount, setDidMount] = React.useState(false)
    const rows = rowsData
    const columns = [
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
        setDidMount(true);
        return () => setDidMount(false);
    }, [rowsData, props.match.params.id])

    if (!didMount)
        return null
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