import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const FetchByIdDialog = ({ open, handleClose }) => {

    const { singleTodo } = useSelector((state) => state.todoAPI);

    return (
        <BootstrapDialog open={open} onClose={handleClose}  >
            <DialogTitle>Todo Details</DialogTitle>

            <DialogContent dividers>
                <Typography>   ID: {singleTodo?.id} </Typography>

                <Typography> Todo: {singleTodo?.todo} </Typography>

                <Typography>   Completed:{" "}  {singleTodo?.completed ? "Yes" : "No"} </Typography>

                <Typography> User ID: {singleTodo?.userId}  </Typography>
            </DialogContent>

            <DialogActions><Button onClick={handleClose}>Close</Button> </DialogActions>
        </BootstrapDialog>
    );
}








