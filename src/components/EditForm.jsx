import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const EditForm = () => {
  const { onBackdropClick, editedData, data, setData, indexes} = useContext(AppContext);

  const [isFirstRender, setIsFirstRender] = useState(true)
  const [editedTask, setEditedTask] = useState({
    taskName: '',
    description: '',
  });

  
  useEffect(() => {
    isFirstRender ? setEditedTask(editedData) : null;
    setIsFirstRender(false);
  }), [editedData];

  const dataHandler = (event) => {
    const { id, value } = event.target;
    setEditedTask({ ...editedTask, [id]: value });
  };

   const submitHandler = (event) => {
    event.preventDefault();
    const newData = data.map((column, columnIndex) => {
      if (columnIndex === indexes.columnIndex) {
        const tasks = column.tasks.map((task, taskIndex) => {
          if (taskIndex === indexes.taskIndex) {
            return editedTask;
          }
          return task;
        });
        return { ...column, tasks };
      }
      return column;
    });
    setData(newData);
    onBackdropClick();
    setEditedTask({
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
    <Dialog open onClose={onBackdropClick}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Edit Task
          </Typography>
          <TextField
            required
            onChange={dataHandler}
            value={editedTask.taskName}
            sx={classes.textField}
            id="taskName"
            label=" Task Name"
          />
          <TextField
            required
            onChange={dataHandler}
            value={editedTask.description}
            sx={classes.textField}
            multiline
            minRows={3}
            id="description"
            label="Description"
          />
          <DialogActions>
            <Button type="submit" sx={{ width: 150, mx: 'auto', mb: 1 }} variant="contained">
              save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
