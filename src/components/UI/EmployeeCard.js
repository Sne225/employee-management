import React from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const { firstName, lastName, position } = employee;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="body2" color="textSecondary">{`Position: ${position}`}</Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
        <Button variant="contained" color="primary" onClick={onEdit} startIcon={<FaEdit />}>
          Edit
        </Button>
        <IconButton color="error" onClick={onDelete} aria-label="delete">
          <FaTrash />
        </IconButton>
      </div>
    </Card>
  );
};

export default EmployeeCard;
