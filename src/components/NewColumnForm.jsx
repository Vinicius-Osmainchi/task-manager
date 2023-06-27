import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const NewColumnForm = (props) => {
  const { onBackdropClick, setData, data } = useContext(AppContext);
  const [existingTitle, setExistingTitle] = useState(false);
  const [columns, setColumns] = useState({
    title: '',
    background: '',
    tasks: '',
  });

  const dataHandler = (event) => {
    const { id, value } = event.target;
    setColumns({ ...columns, [id]: value });
    setExistingTitle(data?.some((item) => item.title.toLowerCase() === value.toLowerCase()));
  };

  const backdropHandler = () => {
    onBackdropClick();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    backdropHandler();
    setColumns({
      title: columns.title,
      background: color,
      tasks: [],
    });
    const newColumn = { title: columns.title, background: color, tasks: [] };
    setData((prevData) => [...prevData, newColumn]);
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
            value={columns.title}
            sx={{ width: 350, m: 2 }}
            id="title"
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

export default NewColumnForm;
