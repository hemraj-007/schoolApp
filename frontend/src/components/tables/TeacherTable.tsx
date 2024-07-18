import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ITeacher } from '../../types';

interface TeacherTableProps {
  teachers: ITeacher[];
}

const TeacherTable: React.FC<TeacherTableProps> = ({ teachers}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Contact Details</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Assigned Class</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher:any) => (
            <TableRow key={teacher._id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.gender}</TableCell>
              <TableCell>{new Date(teacher.DOB).toLocaleDateString()}</TableCell>
              <TableCell>{teacher.contact_details}</TableCell>
              <TableCell>{teacher.salary}</TableCell>
              <TableCell>{teacher.assigned_class?.class_name || 'No class assigned'}</TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherTable;
