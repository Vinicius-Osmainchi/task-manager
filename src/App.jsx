import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Header from './components/Header';
import ThemeToggle from './ui/ThemeToggle';
import MainBoard from './components/MainBoard';
import DataColumn from './components/DataColumn';
import TaskCard from './components/TaskCard';
import NewTaskForm from './components/NewTaskForm';
import EditForm from './components/EditForm';
import SwapForm from './components/SwapForm';
import NewColumnForm from './components/NewColumnForm';
import { Box, Fab } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditColumnNameForm from './components/EditColumnNameForm';

function App() {
  const {
    data,
    newColumnVisible,
    newTaskVisible,
    editFormVisible,
    swapFormVisible,
    setNewColumnVisible,
    editColumnNameFormVisible,
  } = useContext(AppContext);

  return (
    <>
      <ThemeToggle>
        <Header />
        {editColumnNameFormVisible ? <EditColumnNameForm /> : null}
        {swapFormVisible ? <SwapForm /> : null}
        {editFormVisible ? <EditForm /> : null}
        {newTaskVisible ? <NewTaskForm /> : null}
        {newColumnVisible ? <NewColumnForm /> : null}
        <MainBoard>
          {data?.map((column, columnIndex) => {
            return (
              <DataColumn key={columnIndex} title={column.title} index={columnIndex} background={column.background}>
                {column.tasks.map((task, index) => (
                  <TaskCard
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
            <Fab color="primary" onClick={() => setNewColumnVisible(true)}>
              <AddCircleOutlineRoundedIcon fontSize="large" />
            </Fab>
          </Box>
        </MainBoard>
      </ThemeToggle>
    </>
  );
}

export default App;
