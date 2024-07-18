import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { ITeacher } from '../types';
import { getTeachers, createTeacher } from '../services/api'; // Ensure deleteTeacher is imported
import TeacherForm from '../components/forms/TeachersForm';
import TeacherTable from '../components/tables/TeacherTable';
import { useSnackbar } from 'notistack';

const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeachers();
      setTeachers(response.data);
    };

    fetchData();
  }, []);

  const handleCreateTeacher = async (newTeacher: ITeacher) => {
    try {
      await createTeacher(newTeacher);
      setShowForm(false);
      const response = await getTeachers();
      setTeachers(response.data);
      enqueueSnackbar('Teacher created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating teacher', { variant: 'error' });
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Teacher Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Teacher'}
        </Button>
        {showForm && <TeacherForm onSubmit={handleCreateTeacher} />}
        <TeacherTable teachers={teachers}/>
      </Box>
    </Container>
  );
};

export default TeacherManagement;
