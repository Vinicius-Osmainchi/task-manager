import { useState } from 'react';
import ThemeToggle from './ui/ThemeToggle';
import MainBoard from './components/MainBoard';
import DataColumn from './components/DataColumn';
import TaskCard from './components/TaskCard';
import NewTaskForm from './components/NewTaskForm';
import EditForm from './components/EditForm';
import SwapForm from './components/SwapForm';
import { Box, Button, IconButton } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import NewColumnForm from './components/NewColumnForm';
import Header from './components/Header';

function App() {
  const [newColumnVisible, setNewColumnVisible] = useState(false);
  const [newTaskVisible, setNewTaskVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [swapFormVisible, setSwapFormVisible] = useState(false);
  const [theme, setTheme] = useState('dark');
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
    setData((prevData) => [...prevData, newColumn]);
  };

  const dataHandler = (newTask) => {
    setData((prevData) => {
      const newData = prevData.slice(0);
      const newTasks = [...newData[0].tasks, newTask];
      return [{ ...newData[0], tasks: newTasks }, ...newData.slice(1)];
    });
  };

  const deleteHandler = (indexToRemove, columnIndex) => {
    setData((prevData) => {
      const newTasks = prevData[columnIndex].tasks.filter((_, i) => i !== indexToRemove);
      const newColumn = { ...prevData[columnIndex], tasks: newTasks };
      const filteredData = prevData.filter((_, i) => i !== columnIndex);
      return [...filteredData.slice(0, columnIndex), newColumn, ...filteredData.slice(columnIndex)];
    });
  };

  const moveUpHandler = (index, columnIndex) => {
    setData((prevData) => {
      const tempArr = [...prevData[columnIndex].tasks];
      const tempItem = tempArr.splice(index, 1);
      const newData = [...prevData];
      tempArr.splice(index - 1, 0, tempItem[0]);
      newData[columnIndex] = { ...newData[columnIndex], tasks: tempArr };
      return [...newData];
    });
  };

  const moveDownHandler = (index, columnIndex) => {
    setData((prevData) => {
      const tempArr = [...prevData[columnIndex].tasks];
      const tempItem = tempArr.splice(index, 1);
      const newData = [...prevData];
      tempArr.splice(index + 1, 0, tempItem[0]);
      newData[columnIndex] = { ...newData[columnIndex], tasks: tempArr };
      return [...newData];
    });
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
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.title === event) {
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
  };

  return (
    <>
      <ThemeToggle theme={theme}>
        <Header onThemeChange={(e) => setTheme(e)} onAddNewTask={(e) => setNewTaskVisible(e)} />
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
          <NewColumnForm
            appData={data}
            onDataSubmit={columnDataHandler}
            onBackdropClick={(props) => setNewColumnVisible(props)}
          />
        ) : null}
        <MainBoard>
          {data?.map((column, columnIndex) => {
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
                    addedTime={task.addedTime}
                    index={index}
                    columnIndex={columnIndex}
                    dataLength={column.tasks.length}
                  />
                ))}
              </DataColumn>
            );
          })}
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
