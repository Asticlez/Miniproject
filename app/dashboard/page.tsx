"use client";

import React, { useState } from "react";
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
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  // State definitions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passportNo, setPassportNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<
    Array<{
      id: number;
      checkInDate: string;
      checkOutDate: string | null;
      firstName: string;
      lastName: string;
      nationality: string;
    }>
  >([]);
  const [error, setError] = useState("");

  // Menu handlers
  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    router.push("/profile");
    handleProfileMenuClose();
  };
  const handleAdminClick = () => {
    router.push("/admin"); // Navigate to Admin page
    handleProfileMenuClose();
  };
  const handleLogoutClick = () => {
    alert("Logout functionality goes here.");
    handleProfileMenuClose();
  };

  // Navigation to Add Accommodation
  const handleAddClick = () => {
    router.push("/add-accommodation");
  };

  // Search handler
  const handleSearch = async () => {
    if (!passportNo) {
      setError("Please enter a passport number to search.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/accommodation?passportNo=${passportNo}`);
      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Error fetching data.");
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <IconButton sx={{ color: "#ffffff" }} onClick={handleProfileMenuClick}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MuiMenuItem onClick={handleProfileClick}>Profile</MuiMenuItem>
          <MuiMenuItem onClick={handleAdminClick}>Admin</MuiMenuItem>
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
              color: "#000000",
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
              <TextField
                fullWidth
                label="Passport No."
                variant="outlined"
                value={passportNo}
                onChange={(e) => setPassportNo(e.target.value)}
              />
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
                onClick={handleAddClick}
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
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setData([])}
              >
                Clear
              </Button>
            </Box>
          </Box>

          {/* Error Message */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Search Results */}
          {data.length > 0 && (
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Check-in Date</TableCell>
                    <TableCell>Check-out Date</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Nationality</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {new Date(item.checkInDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {item.checkOutDate
                          ? new Date(item.checkOutDate).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.nationality}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;