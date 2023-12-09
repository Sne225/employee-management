// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import EmployeeCard from '../components/UI/EmployeeCard';
import SideNavigation from '../components/UI/SideNavigation';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase'; // assuming you've exported your initialized firestore instance as 'db'

const RootContainer = styled('div')({
  padding: (theme) => theme.spacing(2),
});

const Title = styled(Typography)({
  textAlign: 'center',
  margin: (theme) => theme.spacing(2),
});

const CreateButton = styled(Button)({
  marginBottom: (theme) => theme.spacing(2),
});

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = collection(firestore, 'employees');
        const employeesSnapshot = await getDocs(employeesCollection);
        const employeeData = employeesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete employee with ID: ${id}`);
  };

  const handleCreate = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateEmployee = () => {
    // Add logic to create a new employee
    // You can access form data here and perform necessary actions

    // After creating the employee, you may want to refetch the employee list
    // to include the newly created employee
    // fetchEmployees();

    // Close the dialog
    setOpenDialog(false);
  };

  return (
    <RootContainer>
      <SideNavigation />
      <Card className="welcome-card">
        <Box p={4}>
          <Typography variant="h4" textAlign="center">
            Employee Portal
          </Typography>
          <Typography textAlign="center" mt={2}>
            Employee List
          </Typography>
        </Box>
      </Card>
      <CreateButton variant="contained" color="primary" onClick={handleCreate}>
        Create
      </CreateButton>

      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id}>
            <ListItemText primary={`${employee.name} - ${employee.email}`} />
            <Button onClick={() => handleEdit(employee.id)}>Edit</Button>
            <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>

      {/* Dialog for Create */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          {/* Add your form or input fields for creating a new employee */}
          {/* Example: <TextField label="First Name" fullWidth /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="primary" onClick={handleCreateEmployee}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </RootContainer>
  );
};

export default EmployeeList;
