// src/components/layout/Layout.tsx

import React, { ReactNode } from 'react';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
