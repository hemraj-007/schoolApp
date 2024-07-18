import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IStudent } from "../../types";
import { deleteStudent } from "../../services/api";

interface StudentTableProps {
  students: IStudent[];
  onDelete: (id: string) => void; // Callback to refresh the student list after deletion
}

const StudentTable: React.FC<StudentTableProps> = ({ students, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);

  const handleClickOpen = (student: IStudent) => {
    console.log("Opening dialog for student:", student); // Debugging
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = async () => {
    if (selectedStudent && selectedStudent.id) {
      console.log("Deleting student:", selectedStudent.id); // Debugging step
      try {
        const response = await deleteStudent(selectedStudent.id);
        console.log("API response:", response); // Debugging step
        onDelete(selectedStudent.id);
      } catch (error) {
        console.error("Error deleting student:", error);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Contact Details</TableCell>
              <TableCell>Fees Paid</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>
                  {new Date(student.DOB).toLocaleDateString()}
                </TableCell>
                <TableCell>{student.contact_details}</TableCell>
                <TableCell>{student.fees_paid}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleClickOpen(student)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the student "{selectedStudent?.name}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentTable;
