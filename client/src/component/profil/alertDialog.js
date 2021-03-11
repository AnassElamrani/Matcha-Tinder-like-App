import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const AlertDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleInsUpd = () => {
        console.log("Insert Update image")
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteDialog = () => {
        console.log("Delete images")
    };

    return (
        <div>
            <p onClick={handleClickOpen}>d</p>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Choose your action:"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleInsUpd} color="primary">
                        Insert/Update
          </Button>
                    <Button onClick={handleDeleteDialog} color="secondary" autoFocus>
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog