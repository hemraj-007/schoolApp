import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { grey } from '@mui/material/colors'; // Import the grey color palette

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', textAlign: 'center', bgcolor: grey[200] }}>
      <Typography variant="body1">© 2024 School Name. All rights reserved.</Typography>
      <Typography variant="body2">1234 School Address, City, State, ZIP</Typography>
      <Typography variant="body2">Contact us: (123) 456-7890 | <Link href="mailto:info@schoolname.com">info@schoolname.com</Link></Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton color="primary" component="a" href="https://www.facebook.com" target="_blank">
          <FacebookIcon />
        </IconButton>
        <IconButton color="primary" component="a" href="https://www.twitter.com" target="_blank">
          <TwitterIcon />
        </IconButton>
        <IconButton color="primary" component="a" href="https://www.instagram.com" target="_blank">
          <InstagramIcon />
        </IconButton>
        <IconButton color="primary" component="a" href="mailto:info@schoolname.com">
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
