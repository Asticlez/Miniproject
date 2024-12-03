"use client";

import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  // State for the profile menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push("/profile"); // Navigate to profile page
    handleProfileMenuClose();
  };

  const handleSettingsClick = () => {
    alert("Settings functionality goes here."); // Replace with actual settings logic
    handleProfileMenuClose();
  };

  const handleLogoutClick = () => {
    alert("Logout functionality goes here."); // Replace with actual logout logic
    handleProfileMenuClose();
  };

  return (
    <Box>
      {/* Top Blue Bar */}
      <Box
        sx={{
          backgroundColor: "#007bff",
          color: "#ffffff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          PSU Immigration by Tonkla
        </Typography>
        <IconButton
          sx={{ color: "#ffffff" }}
          onClick={handleProfileMenuClick}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MuiMenuItem onClick={handleProfileClick}>Profile</MuiMenuItem>
          <MuiMenuItem onClick={handleSettingsClick}>Settings</MuiMenuItem>
          <MuiMenuItem onClick={handleLogoutClick}>Logout</MuiMenuItem>
        </Menu>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          minHeight: "calc(100vh - 50px)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#000000", // Black color for the text
            }}
          >
            Inform Accommodation
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" variant="outlined" />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Date of Inform (From)"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Date of Inform (To)"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Date of Stay (From)"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Date of Stay (To)"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Passport No." variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Nationality" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Records per Page"
                variant="outlined"
                defaultValue="10"
                select
              >
                {[10, 20, 50, 100].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Box>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ marginRight: "10px" }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                sx={{ marginRight: "10px" }}
              >
                Import Excel
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ marginRight: "10px" }}
              >
                Download Example File
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "10px" }}
              >
                Search
              </Button>
              <Button variant="outlined" color="secondary">
                Clear
              </Button>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              marginTop: "20px",
              color: "#666",
              textAlign: "center",
            }}
          >
            Data are shown only if Check-in date is within 7 days from today.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;