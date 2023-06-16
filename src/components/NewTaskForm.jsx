import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const NewTaskForm = (props) => {

  useEffect(() => {
    const currentTime = new Date();
    setAddedTime(currentTime);
  }, []);

  const [addedTime, setAddedTime] = useState(null);
  const [data, setData] = useState({
    taskName: '',
    description: '',
    addedTime: '',
  });
  
  const dataHandler = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value, addedTime: addedTime });
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
            label="Task Name"
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
