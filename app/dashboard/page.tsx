"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const DashboardPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const INACTIVITY_LIMIT = 2 * 60 * 1000; // 2 minutes
  let inactivityTimeout: NodeJS.Timeout;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    router.push("/profile");
  };

  const handleChangePassword = () => {
    setAnchorEl(null);
    router.push("/forgot-password");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("authToken"); // Clear authentication token
    router.push("/"); // Redirect to homepage
  };

  // Reset the inactivity timer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      handleLogout(); // Auto-logout on inactivity
    }, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Attach event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Initialize timer
    resetInactivityTimer();

    // Cleanup event listeners and timeout on unmount
    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []); // Empty dependency array to ensure this only runs once

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ backgroundColor: "#007bff" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Immigration Bureau
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content Section */}
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          Inform Accommodation
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          Data are shown only if Check-in date is within 7 days from today.
        </Typography>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 20px" }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ padding: "10px 20px" }}
          >
            Import Excel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ padding: "10px 20px" }}
          >
            Download Example File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;