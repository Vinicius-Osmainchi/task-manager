import React, { useContext } from 'react';
import { Card, Typography, CardContent, CardActions, Box, Fab } from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import SwapHorizontalCircleTwoToneIcon from '@mui/icons-material/SwapHorizontalCircleTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import { AppContext } from '../context/AppContext';
import { useDrag } from 'react-dnd';

const TaskCard = (props) => {
  const { data, setData, setSwapFormVisible, setEditFormVisible, setEditedData, setSwapData, setIndexes } =
    useContext(AppContext);

  const moveUpHandler = () => {
    setData((prevData) => {
      const tempArr = [...prevData[props.columnIndex].tasks];
      const tempItem = tempArr.splice(props.index, 1);
      const newData = [...prevData];
      tempArr.splice(props.index - 1, 0, tempItem[0]);
      newData[props.columnIndex] = { ...newData[props.columnIndex], tasks: tempArr };
      return [...newData];
    });
  };

  const moveDownHandler = () => {
    setData((prevData) => {
      const tempArr = [...prevData[props.columnIndex].tasks];
      const tempItem = tempArr.splice(props.index, 1);
      const newData = [...prevData];
      tempArr.splice(props.index + 1, 0, tempItem[0]);
      newData[props.columnIndex] = { ...newData[props.columnIndex], tasks: tempArr };
      return [...newData];
    });
  };

  const swapHandler = () => {
    setSwapFormVisible(true);
    const newData = [...data];
    const swapedTask = newData[props.columnIndex].tasks[props.index];
    setSwapData({
      taskIndex: props.index,
      columnIndex: props.columnIndex,
      swapedTask,
    });
  };

  const deleteHandler = () => {
    setData((prevData) => {
      const newTasks = prevData[props.columnIndex].tasks.filter((_, i) => i !== props.index);
      const newColumn = { ...prevData[props.columnIndex], tasks: newTasks };
      const filteredData = prevData.filter((_, i) => i !== props.columnIndex);
      return [...filteredData.slice(0, props.columnIndex), newColumn, ...filteredData.slice(props.columnIndex)];
    });
  };

  const editHandler = () => {
    setEditFormVisible(true);
    setEditedData(data[props.columnIndex].tasks[props.index]);
    setIndexes({
      taskIndex: props.index,
      columnIndex: props.columnIndex,
    });
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={dragRef}
      isDragging={isDragging}
      variant="outlined"
      sx={
        !isDragging
          ? { m: 1, my: 0, pt: 1, minWidth: 200, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)', cursor: 'grab' }
          : {
              opacity: '50%',
              m: 1,
              my: 0,
              pt: 1,
              minWidth: 200,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)',
              cursor: 'grabbing',
              border: '2px dashed black',
            }
      }
    >
      <CardActions sx={{ p: 0.5, justifyContent: 'space-around' }}>
        <Fab
          color="primary"
          size="small"
          id="moveUp"
          disabled={props.index === 0 ? true : false}
          onClick={moveUpHandler}
        >
          <ArrowCircleUpTwoToneIcon />
        </Fab>
        <Fab
          color="primary"
          size="small"
          disabled={props.index === props.dataLength - 1 ? true : false}
          onClick={moveDownHandler}
        >
          <ArrowCircleDownTwoToneIcon />
        </Fab>
        <Fab color="primary" size="small" onClick={swapHandler}>
          <SwapHorizontalCircleTwoToneIcon />
        </Fab>
        <Fab color="primary" size="small" onClick={editHandler}>
          <BuildCircleTwoToneIcon />
        </Fab>
        <Fab color="primary" size="small" onClick={deleteHandler}>
          <HighlightOffTwoToneIcon />
        </Fab>
      </CardActions>
      <CardContent sx={{ pt: 0 }}>
        <Typography sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 9, mb: -2.1 }}>{`#${
          props.index + 1
        }`}</Typography>
        <Typography sx={{ fontSize: 15, mb: 0 }} color="text.secondary" gutterBottom>
          Task Name
        </Typography>
        <Typography variant="h5">{props.taskName ? props.taskName : null}</Typography>
        <Typography sx={{ fontSize: 15, mt: 1, mb: 0.1 }} color="text.secondary">
          Task Description
        </Typography>
        <Typography variant="body2">{props.description ? props.description : null}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: -2 }}>
          <Typography color="text.secondary" sx={{ fontSize: 9 }}>
            Time Added
          </Typography>
          <Typography sx={{ fontSize: 9 }}>
            {props.addedTime.toDateString()} - {props.addedTime.toLocaleTimeString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
