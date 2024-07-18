import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { IClass } from '../types';
import { getClasses, createClass } from '../services/api';
import ClassForm from '../components/forms/ClassForm';
import ClassTable from '../components/tables/ClassTable';
import { useSnackbar } from 'notistack';

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getClasses();
      setClasses(response.data);
    };

    fetchData();
  }, []);

  const handleCreateClass = async (newClass: IClass) => {
    try {
      await createClass(newClass);
      setShowForm(false);
      const response = await getClasses();
      setClasses(response.data);
      enqueueSnackbar('Class created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating class', { variant: 'error' });
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Class Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Class'}
        </Button>
        {showForm && <ClassForm onSubmit={handleCreateClass} />}
        <ClassTable classes={classes} />
      </Box>
    </Container>
  );
};

export default ClassManagement;
