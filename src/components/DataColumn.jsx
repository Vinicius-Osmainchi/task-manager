import { Box, IconButton, Paper, Typography } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DataColumn = ({ children, title, background, index, id }) => {
  const { setColumnToBeEdited, setEditColumnNameFormVisible } = useContext(AppContext);

  const editColumnHandler = () => {
    console.log(id);
    setColumnToBeEdited({ title, index });
    setEditColumnNameFormVisible(true);
  };

  return (
    <Paper sx={{ mx: 1, mb: 1, pb: 1, background, minWidth: 270, minHeight: 240, maxWidth: 270 }} elevation={3}>
      <Typography sx={{ pt: 1, mb: 2, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }} align="center" variant="h5">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end', mt: -6, mr: 1, mb:1 }}>
        <IconButton onClick={editColumnHandler}>
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
      </Box>
      {children}
    </Paper>
  );
};

export default DataColumn;
