import axios from "axios";
import { IClass, ITeacher, IStudent } from "../types";

const API_URL = "http://localhost:5000/api";

export const getClasses = async () => {
  return await axios.get<IClass[]>(`${API_URL}/classes`);
};

export const getTeachers = async () => {
  return await axios.get<ITeacher[]>(`${API_URL}/teachers`);
};

export const getStudents = async () => {
  return await axios.get<IStudent[]>(`${API_URL}/students`);
};

export const createClass = async (newClass: IClass) => {
  return await axios.post<IClass>(`${API_URL}/classes`, newClass);
};

export const createTeacher = async (newTeacher: ITeacher) => {
  return await axios.post<ITeacher>(`${API_URL}/teachers`, newTeacher);
};

export const createStudent = async (newStudent: IStudent) => {
  return await axios.post<IStudent>(`${API_URL}/students`, newStudent);
};

export const deleteStudent = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`); // Use DELETE method here
};
