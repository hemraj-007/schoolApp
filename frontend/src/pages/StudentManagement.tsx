import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { IStudent } from '../types';
import { getStudents, createStudent } from '../services/api';
import StudentForm from '../components/forms/StudentForm';
import StudentTable from '../components/tables/StudentTable';
import { useSnackbar } from 'notistack';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStudents();
      setStudents(response.data);
    };

    fetchData();
  }, []);

  const handleCreateStudent = async (newStudent: IStudent) => {
    try {
      await createStudent(newStudent);
      setShowForm(false);
      const response = await getStudents();
      setStudents(response.data);
      enqueueSnackbar('Student created successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating student', { variant: 'error' });
    }
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Student Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Student'}
        </Button>
        {showForm && <StudentForm onSubmit={handleCreateStudent} />}
        <StudentTable students={students} onDelete={handleDeleteStudent} />
      </Box>
    </Container>
  );
};

export default StudentManagement;
