import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { IClass, ITeacher, IStudent } from '../../types';
import { getClasses } from '../../services/api';

type FormModel = 'class' | 'teacher' | 'student';

interface DynamicFormProps {
  model: FormModel;
  onSubmit: (data: IClass | ITeacher | IStudent) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ model, onSubmit }) => {
  const [formData, setFormData] = useState<IClass | ITeacher | IStudent>(
    model === 'class'
      ? { class_name: '', year: new Date().getFullYear(), teacher: '', student_fees: 0, student_list: [] }
      : model === 'teacher'
      ? { name: '', gender: '', DOB: '', contact_details: '', salary: 0, assigned_class: '' }
      : { name: '', gender: '', DOB: '', contact_details: '', fees_paid: 0, class: '' }
  );

  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    if (model === 'student' || model === 'teacher') {
      const fetchClasses = async () => {
        const response = await getClasses();
        setClasses(response.data);
      };

      fetchClasses();
    }
  }, [model]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {Object.keys(formData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            {key === 'class' || key === 'assigned_class' ? (
              <TextField
                fullWidth
                select
                variant="outlined"
                label={key.replace('_', ' ')}
                name={key}
                value={formData[key as keyof typeof formData] as string}
                onChange={handleChange}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.class_name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                label={key.replace('_', ' ')}
                name={key}
                value={formData[key as keyof typeof formData] as string}
                onChange={handleChange}
                select={key === 'gender'}
              >
                {key === 'gender' &&
                  ['Male', 'Female', 'Other'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DynamicForm;
