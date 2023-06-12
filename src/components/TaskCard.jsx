import React from 'react';
import { Card, Typography, CardContent, CardActions } from '@mui/material';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import SwapHorizontalCircleTwoToneIcon from '@mui/icons-material/SwapHorizontalCircleTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import IconButton from '@mui/material/IconButton';

const TaskCard = (props) => {

  const moveUpHandler = () => {
  props.onRaisePriority(props.index, props.columnIndex);
  };
  const moveDownHandler = () => {
    props.onDownPriority(props.index, props.columnIndex);
  };
  const swapHandler = () => {
    props.onSwap(true, props.index, props.columnIndex);
  };
  const deleteHandler = () => {
    props.onDelete(props.index, props.columnIndex);
  };
  const editHandler = () => {
    props.onEditTask(true, props.index, props.columnIndex);
  };

  return (
    <Card variant="outlined" sx={{ m: 1, minWidth: 200 }}>
      <CardActions sx={{ p: 0, justifyContent: 'space-around' }}>
        <IconButton id='moveUp' disabled={props.index === 0 ? true : false} onClick={moveUpHandler}>
          <ArrowCircleUpTwoToneIcon />
        </IconButton>
        <IconButton disabled={props.index === props.dataLength - 1 ? true : false} onClick={moveDownHandler}>
          <ArrowCircleDownTwoToneIcon />
        </IconButton>
        <IconButton onClick={swapHandler}>
          <SwapHorizontalCircleTwoToneIcon />
        </IconButton>
        <IconButton onClick={editHandler}>
          <BuildCircleTwoToneIcon />
        </IconButton>
        <IconButton onClick={deleteHandler}>
          <HighlightOffTwoToneIcon />
        </IconButton>
      </CardActions>
      <CardContent sx={{ pt: 0 }}>
        <Typography sx={{ display:'flex', justifyContent:'flex-end', fontSize: 9, mb:-2.1}}>{`#${props.index + 1}`}</Typography>
        <Typography sx={{ fontSize: 14, mb: 0 }} color="text.secondary" gutterBottom>
          Task Name
        </Typography>
        <Typography variant="h5">{props.taskName ? props.taskName : null}</Typography>
        <Typography sx={{ fontSize: 14, mt: 1, mb: 0.1 }} color="text.secondary">
          Task Description
        </Typography>
        <Typography variant="body2">{props.description ? props.description : null}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
