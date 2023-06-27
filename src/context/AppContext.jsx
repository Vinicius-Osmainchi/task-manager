import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [newColumnVisible, setNewColumnVisible] = useState(false);
  const [newTaskVisible, setNewTaskVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [swapFormVisible, setSwapFormVisible] = useState(false);
  const [editColumnNameFormVisible, setEditColumnNameFormVisible] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [swapData, setSwapData] = useState({});
  const [columnToBeEdited, setColumnToBeEdited] = useState('');
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

  const onBackdropClick = () => {
    setSwapFormVisible(false);
    setEditFormVisible(false);
    setNewTaskVisible(false);
    setNewColumnVisible(false);
    setEditColumnNameFormVisible(false);
  };

 

  return (
    <AppContext.Provider
      value={{
        data,
        newColumnVisible,
        newTaskVisible,
        editFormVisible,
        swapFormVisible,
        theme,
        swapData,
        editedData,
        columnToBeEdited,
        editColumnNameFormVisible,
        indexes,
        setData,
        setTheme,
        setNewTaskVisible,
        setSwapFormVisible,
        setNewColumnVisible,
        setSwapFormVisible,
        setEditFormVisible,
        setSwapData,
        setIndexes,
        setEditedData,
        setColumnToBeEdited,
        setEditColumnNameFormVisible,
        onBackdropClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
