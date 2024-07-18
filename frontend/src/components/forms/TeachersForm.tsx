import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import { ITeacher, IClass } from '../../types';
import { getClasses } from '../../services/api';

interface TeacherFormProps {
  onSubmit: (data: ITeacher) => void;
}

const initialFormState: ITeacher = {
  name: '',
  gender: '',
  DOB: '',
  contact_details: '',
  salary: 0,
  assigned_class: ''
};

const TeacherForm: React.FC<TeacherFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ITeacher>(initialFormState);
  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getClasses();
      setClasses(response.data);
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClassChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Date of Birth"
            name="DOB"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.DOB}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Contact Details"
            name="contact_details"
            value={formData.contact_details}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Assigned Class"
            name="assigned_class"
            value={formData.assigned_class}
            onChange={handleClassChange}
          >
            {classes.map((cls:any) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.class_name}
              </MenuItem>
            ))}
          </TextField>
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

export default TeacherForm;
