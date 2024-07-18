// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ClassManagement from "./pages/ClassManagement";
import TeacherManagement from "./pages/TeacherManagement";
import StudentManagement from "./pages/StudentManagement";
import Layout from "./components/layouts/LayOut";
import { SnackbarProvider } from "notistack";
import Dashboard from "./pages/Dashboard";
//import CloseIcon from '@mui/icons-material/Close';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<ClassManagement />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/students" element={<StudentManagement />} />
          </Routes>
        </Layout>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
