'use client'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { ConnectButton } from "thirdweb/react";
import { client } from "../../lib/utils";
export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#252b3a'  }}>
      <Toolbar>
      
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#ff7f50', fontWeight: 'bold' }}>
        <Link href="/"> 
          Dashboard
          </Link>
        </Typography>
       
        <Box>
          
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
