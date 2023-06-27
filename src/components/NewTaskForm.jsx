import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const NewTaskForm = () => {
  useEffect(() => {
    const currentTime = new Date();
    setAddedTime(currentTime);
  }, []);

  const { onBackdropClick, setData } = useContext(AppContext);

  const [addedTime, setAddedTime] = useState(null);
  const [newTask, setNewTask] = useState({
    taskName: '',
    description: '',
    addedTime: '',
  });

  const dataHandler = (event) => {
    const { id, value } = event.target;
    setNewTask({ ...newTask, [id]: value, addedTime: addedTime });
  };

   const submitHandler = (event) => {
    event.preventDefault();
    setData((prevData) => {
      const newData = prevData.slice(0);
      const newTasks = [...newData[0].tasks, newTask];
      return [{ ...newData[0], tasks: newTasks }, ...newData.slice(1)];
    });
    onBackdropClick();
    setNewTask({
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
    <Dialog open onClose={onBackdropClick}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Add New Task
          </Typography>
          <TextField
            required
            onChange={dataHandler}
            value={newTask.taskName}
            sx={classes.textField}
            id="taskName"
            label="Task Name"
          />
          <TextField
            required
            onChange={dataHandler}
            value={newTask.description}
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
