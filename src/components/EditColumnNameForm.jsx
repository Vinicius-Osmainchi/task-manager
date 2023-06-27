import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const EditColumnNameForm = () => {
  const { onBackdropClick, columnToBeEdited, setColumnToBeEdited, setData, data } = useContext(AppContext);

  const [existingTitle, setExistingTitle] = useState(false);

  const dataHandler = (event) => {
    const { value } = event.target;
    setColumnToBeEdited({ ...columnToBeEdited, title: value });
    console.log(columnToBeEdited);
    setExistingTitle(data?.some((item) => item.title.toLowerCase() === value.toLowerCase()));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const newData = data.map((column, columnIndex) => {
      if (columnIndex === columnToBeEdited.index) {
        const updatedColumn = { ...column, title: columnToBeEdited.title };
        return updatedColumn;
      }
      return column;
    });
    setData(newData);
    onBackdropClick();
  };

  return (
    <Dialog open onClose={onBackdropClick}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Edit Column Name
          </Typography>
          <TextField
            required
            error={existingTitle}
            helperText={existingTitle ? 'Column name already assigned.' : ''}
            onChange={dataHandler}
            value={columnToBeEdited.title}
            sx={{ width: 350, m: 2 }}
            id="title"
            label="New Column Name"
          />

          <DialogActions>
            <Button disabled={existingTitle} type="submit" sx={{ width: 150, mx: 'auto', mb: 1 }} variant="contained">
              ADD
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditColumnNameForm;
