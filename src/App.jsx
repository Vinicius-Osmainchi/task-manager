import './App.css';
import { useState } from 'react';
import ThemeToggle from './ui/ThemeToggle';
import MainBoard from './components/MainBoard';
import DataColumn from './components/DataColumn';
import TaskCard from './components/TaskCard';
import NewTaskForm from './components/NewTaskForm';
import EditForm from './components/EditForm';
import SwapForm from './components/SwapForm';
import { Box, Button, IconButton, Select } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NewColumnForm from './components/NewColumnForm';

function App() {
  const [newColumnVisible, setNewColumnVisible] = useState(false);
  const [newTaskVisible, setNewTaskVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [swapFormVisible, setSwapFormVisible] = useState(false);
  const [swapData, setSwapData] = useState({});
  const [editedData, setEditedData] = useState({
    taskName: '',
    description: '',
  });
  const [indexes, setIndexes] = useState({
    taskIndex: '',
    columnIndex: '',
  });
  const [data, setData] = useState([
    {
      title: 'New Tasks',
      background: '#FF6347',
      tasks: [],
    },
    {
      title: 'In Progress',
      background: '#FFD700',
      tasks: [],
    },
    {
      title: 'Done',
      background: '#006400',
      tasks: [],
    },
  ]);

  const columnDataHandler = (e) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    const newColumn = { title: e.newColumn, background: color, tasks: [] };
    setData([...data, newColumn]);
  };
  const dataHandler = (newTask) => {
    const newData = [...data];
    newData[0].tasks.push(newTask);
    setData([...newData]);
  };

  const deleteHandler = (index, columnIndex) => {
    const newData = [...data];
    newData[columnIndex].tasks.splice(index, 1);
    setData([...newData]);
  };

  const moveUpHandler = (index, columnIndex) => {
    const tempArr = data[columnIndex].tasks;
    const tempItem = tempArr.splice(index, 1);
    const newData = [...data];
    tempArr.splice(index - 1, 0, tempItem[0]);
    newData[columnIndex].tasks = tempArr;
    setData([...newData]);
  };
  const moveDownHandler = (index, columnIndex) => {
    const tempArr = data[columnIndex].tasks;
    const tempItem = tempArr.splice(index, 1);
    const newData = [...data];
    tempArr.splice(index + 1, 0, tempItem[0]);
    newData[columnIndex].tasks = tempArr;
    setData([...newData]);
  };

  const swapHandler = (event, index, columnIndex) => {
    setSwapFormVisible(event);
    const newData = [...data];
    const swapedTask = newData[columnIndex].tasks[index];
    setSwapData({
      taskIndex: index,
      columnIndex,
      swapedTask,
    });
  };

  const swapDataHandler = (event) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title == event) {
        const newData = [...data];
        newData[swapData.columnIndex].tasks.splice([swapData.taskIndex], 1);
        newData[i].tasks.push(swapData.swapedTask);
      }
    }
  };

  const editHandler = (event, index, columnIndex) => {
    setEditFormVisible(event);
    setEditedData(data[columnIndex].tasks[index]);
    setIndexes({
      taskIndex: index,
      columnIndex,
    });
  };

  const editedDataHandler = (editedTask) => {
    const newData = [...data];
    newData[indexes.columnIndex].tasks[indexes.taskIndex] = editedTask;
    setData([...newData]);
  };

  return (
    <>
      <ThemeToggle>
        <Button
          onClick={() => setNewTaskVisible(true)}
          sx={{ mt: 2, ml: 20, background: '#DAA520', position: 'absolute' }}
          variant="contained"
        >
          Add Task
        </Button>
        {swapFormVisible ? (
          <SwapForm data={data} onDataSubmit={swapDataHandler} onBackdropClick={(props) => setSwapFormVisible(props)} />
        ) : null}
        {editFormVisible ? (
          <EditForm
            editedTask={editedData}
            onDataSubmit={editedDataHandler}
            onBackdropClick={(props) => setEditFormVisible(props)}
          />
        ) : null}
        {newTaskVisible ? (
          <NewTaskForm onDataSubmit={dataHandler} onBackdropClick={(props) => setNewTaskVisible(props)} />
        ) : null}
        {newColumnVisible ? (
          <NewColumnForm onDataSubmit={columnDataHandler} onBackdropClick={(props) => setNewColumnVisible(props)} />
        ) : null}
        <MainBoard>
          {data
            ? data.map((column, columnIndex) => {
                return (
                  <DataColumn key={columnIndex} title={column.title} index={columnIndex} background={column.background}>
                    {column.tasks.map((task, index) => (
                      <TaskCard
                        onDelete={deleteHandler}
                        onRaisePriority={moveUpHandler}
                        onDownPriority={moveDownHandler}
                        onEditTask={editHandler}
                        onSwap={swapHandler}
                        key={index}
                        description={task.description}
                        taskName={task.taskName}
                        index={index}
                        columnIndex={columnIndex}
                        dataLength={column.tasks.length}
                      />
                    ))}
                  </DataColumn>
                );
              })
            : null}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ height: 50 }} onClick={() => setNewColumnVisible(true)}>
              <AddCircleOutlineRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
        </MainBoard>
      </ThemeToggle>
    </>
  );
}

export default App;
