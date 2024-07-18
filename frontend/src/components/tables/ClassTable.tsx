import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { IClass } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';

interface ClassTableProps {
  classes: IClass[];
  onDelete: (id: string) => void; // Ensure this prop is used for delete action
}

const ClassTable: React.FC<ClassTableProps> = ({ classes, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Student Fees</TableCell>
            <TableCell>Number of Students</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((cls:any) => (
            <TableRow key={cls._id}>
              <TableCell>{cls.class_name}</TableCell>
              <TableCell>{cls.year}</TableCell>
              <TableCell>{cls.teacher?.name || 'No teacher assigned'}</TableCell>
              <TableCell>{cls.student_fees}</TableCell>
              <TableCell>{cls.student_list.length}</TableCell>
              <TableCell>
                <IconButton color="secondary" onClick={() => onDelete(cls._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassTable;
