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
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const SwapForm = () => {
  const [selected, setSelected] = useState('');
  const { onBackdropClick, data, setData, swapData } = useContext(AppContext);

  const selectHandler = (event) => {
    setSelected(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.title === selected) {
          const tasks = [...item.tasks, swapData.swapedTask];
          return { ...item, tasks };
        }
        return item;
      });
      const updatedColumnIndex = swapData.columnIndex;
      const updatedTaskIndex = swapData.taskIndex;
      const newData = updatedData.map((item, index) => {
        if (index === updatedColumnIndex) {
          const tasks = [...item.tasks];
          tasks.splice(updatedTaskIndex, 1);
          return { ...item, tasks };
        }
        return item;
      });
      return [...newData];
    });
    onBackdropClick();
    setSelected('');
  };

  return (
    <Dialog open onClose={onBackdropClick}>
      <DialogContent>
        <form onSubmit={submitHandler}>
          <Typography align="center" variant="h4">
            Select the Column
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="column">Column</InputLabel>
            <Select value={selected} sx={{ width: 250 }} id="column" label="Column" onChange={selectHandler}>
              {data.map((option) => (
                <MenuItem key={option.title} value={option.title}>
                  {option.title}
                </MenuItem>
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
