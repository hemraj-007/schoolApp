import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import { IClass, ITeacher } from '../../types';
import { getTeachers } from '../../services/api';

interface ClassFormProps {
  onSubmit: (data: IClass) => void;
}

const initialFormState: IClass = {
  class_name: '',
  year: new Date().getFullYear(),
  teacher: '',
  student_fees: 0,
  student_list: []
};

const ClassForm: React.FC<ClassFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IClass>(initialFormState);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getTeachers();
      setTeachers(response.data);
    };

    fetchTeachers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTeacherChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      teacher: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Class Name"
            name="class_name"
            value={formData.class_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Teacher"
            name="teacher"
            value={formData.teacher}
            onChange={handleTeacherChange}
          >
            {teachers.map((teacher:any) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Student Fees"
            name="student_fees"
            type="number"
            value={formData.student_fees}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClassForm;
