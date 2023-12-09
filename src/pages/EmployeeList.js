// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EmployeeCard from '../components/UI/EmployeeCard';
import SideNavigation from '../components/UI/SideNavigation';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesCollection = await firestore.collection('employees').get();
        const employeeData = employeesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    // Implement edit logic (e.g., navigate to edit page)
    console.log(`Edit employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    console.log(`Delete employee with ID: ${id}`);
  };

  const handleCreate = () => {
    // Implement create logic (e.g., navigate to create page)
    console.log('Create new employee');
  };

  return (
    <div>
      <SideNavigation/>
      <h2 className="text-center">Employee List</h2>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Create
      </Button>

      <Grid container spacing={2}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
            <EmployeeCard employee={employee} onEdit={() => handleEdit(employee.id)} onDelete={() => handleDelete(employee.id)} />
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Create */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Employee</DialogTitle>
        <DialogContent>
          {/* Add your form or input fields for creating a new employee */}
          {/* Example: <TextField label="First Name" /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="primary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
