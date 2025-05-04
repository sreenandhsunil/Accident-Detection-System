// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();  // Wait until sign out is complete
      navigate("/");         // Then redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Accident Detection
        </Typography>

        <Box>
          <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/livefeed")}>
            Live Feed
          </Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/incidents")}>
            Incidents
          </Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={() => navigate("/stats")}>
            Stats
          </Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
