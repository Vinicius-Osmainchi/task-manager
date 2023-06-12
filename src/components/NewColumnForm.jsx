import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const NewColumnForm = (props) => {
  const [data, setData] = useState({
    newColumn: '',
    title: '',
    tasks: '',
  });

  const dataHandler = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const backdropHandler = () => {
    props.onBackdropClick(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onDataSubmit(data);
    backdropHandler();
    setData({
      title: data.newColumn,
      tasks: [],
    });
  };

  const classes = {
    newColumn: {
      width: 350,
      p: 2,
    },
    textField: {
      width: 535,
      m: 1,
    },
  };

  return (
    <Dialog open onClose={backdropHandler}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Add New Column
          </Typography>
          <TextField
            required
            onChange={dataHandler}
            value={data.newColumn}
            sx={classes.newColumn}
            id="newColumn"
            label="New Column"
          />

          <DialogActions>
            <Button type="submit" sx={{ width: 150, mx: 'auto', mb: 1 }} variant="contained">
              ADD
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewColumnForm;
