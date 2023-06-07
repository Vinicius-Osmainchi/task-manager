import './App.css';
import { useState } from 'react';
import ThemeToggle from './ui/ThemeToggle';
import MainBoard from './components/MainBoard';
import DataColumn from './components/DataColumn';
import TaskCard from './components/TaskCard';
import NewTaskForm from './components/NewTaskForm';
import EditForm from './components/EditForm';
import { Button } from '@mui/material';

function App() {
  const [newTaskVisible, setNewTaskVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
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
      tasks: [
        {
          taskName: 'Nova tarefa',
          description: 'Esta é uma nova tarefa',
        },
        {
          taskName: 'Segunda nova tarefa',
          description: 'Esta é a segunda nova tarefa',
        },
      ],
    },
    {
      title: 'In Progress',
      background: '#FFD700',
      tasks: [
        {
          taskName: 'Nova tarefa',
          description: 'Esta é uma nova tarefa',
        },
        {
          taskName: 'Segunda nova tarefa',
          description: 'Esta é a segunda nova tarefa',
        },
      ],
    },
    {
      title: 'Done',
      background: '#006400',
      tasks: [
        {
          taskName: 'Nova tarefa',
          description: 'Esta é uma nova tarefa',
        },
        {
          taskName: 'Segunda nova tarefa',
          description: 'Esta é a segunda nova tarefa',
        },
      ],
    },
  ]);

  const dataHandler = (newTask) => {
    const newData = data;
    newData[0].tasks.push(newTask);
    setData([...newData]);
  };

  const deleteHandler = (index, columnIndex) => {
    const newData = data;
    newData[columnIndex].tasks.splice(index, 1);
    setData([...newData]);
  };

  const moveUpHandler = (index, columnIndex) => {
    const tempArr = data[columnIndex].tasks;
    const tempItem = tempArr.splice(index, 1);
    const newData = data;
    tempArr.splice(index - 1, 0, tempItem[0]);
    newData[columnIndex].tasks = tempArr;
    setData([...newData]);
  };
  const moveDownHandler = (index, columnIndex) => {
    const tempArr = data[columnIndex].tasks;
    const tempItem = tempArr.splice(index, 1);
    const newData = data;
    tempArr.splice(index + 1, 0, tempItem[0]);
    newData[columnIndex].tasks = tempArr;
    setData([...newData]);
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
    const newData = data;
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
        </MainBoard>
      </ThemeToggle>
    </>
  );
}

export default App;
