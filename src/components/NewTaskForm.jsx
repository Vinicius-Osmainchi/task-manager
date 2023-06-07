import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const NewTaskForm = (props) => {
  const [data, setData] = useState({
    taskName: '',
    description: '',
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
      taskName: '',
      description: '',
    });
  };

  const classes = {
    taskCard: {
      width: 350,
      height: 350,
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
            Add New Task
          </Typography>
          <TextField
            required
            onChange={dataHandler}
            value={data.taskName}
            sx={classes.textField}
            id="taskName"
            label=" Task Name"
          />
          <TextField
            required
            onChange={dataHandler}
            value={data.description}
            sx={classes.textField}
            multiline
            minRows={3}
            id="description"
            label="Description"
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

export default NewTaskForm;
