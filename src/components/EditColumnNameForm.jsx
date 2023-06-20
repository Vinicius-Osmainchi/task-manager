import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const EditColumnNameForm = () => {
    const [existingTitle, setExistingTitle] = useState(false);
  const [data, setData] = useState({
    newColumn: '',
    title: '',
    tasks: '',
  });

  const dataHandler = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
    setExistingTitle(props.appData?.some((item) => item.title.toLowerCase() === value.toLowerCase()));
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

  
  return (
    <Dialog open onClose={backdropHandler}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Add New Column
          </Typography>
          <TextField
            required
            error={existingTitle}
            helperText={existingTitle ? 'Column name already assigned.' : ''}
            onChange={dataHandler}
            value={data.newColumn}
            sx={{ width: 350, m: 2 }}
            id="newColumn"
            label="New Column"
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