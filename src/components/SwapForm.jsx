import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const SwapForm = (props) => {
   const [data, setData] = useState('');

  const dataHandler = (event) => {
        setData(event.target.value);
        };

  const backdropHandler = () => {
    props.onBackdropClick(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onDataSubmit(data, props.index, props.columnIndex);
    backdropHandler();
    setData('');
  };

  
  return (
    <Dialog open onClose={backdropHandler}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Select the Column
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="column">Column</InputLabel>
            <Select value={data} sx={{ width: 250 }} id="column" label="Column" onChange={dataHandler}>
              {props.data.map((option) => (
                <MenuItem key={option.title} value={option.title}>{option.title}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <DialogActions>
            <Button type="submit" sx={{ width: 150, mx: 'auto', mb: 1 }} variant="contained">
              change
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SwapForm;
