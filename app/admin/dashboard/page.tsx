"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

type Accommodation = {
  id: number;
  checkInDate: string; // ISO Date string
  checkOutDate: string | null; // ISO Date string or null
  firstName: string;
  lastName: string;
  nationality: string;
};

const AdminDashboard = () => {
  const [data, setData] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editItem, setEditItem] = useState<Accommodation | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/accommodation");
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error loading data. Please check the console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete record handler
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/accommodation/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete record.");
      }

      // Update local state to reflect the deletion
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setSnackbar({
        open: true,
        message: "Record deleted successfully.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting record:", error);
      setSnackbar({
        open: true,
        message: "Error deleting record.",
        severity: "error",
      });
    }
  };

  // Edit record handler
  const handleEdit = (item: Accommodation) => {
    setEditItem(item); // Open the edit dialog with selected item
  };

  const handleEditSave = async () => {
    if (editItem) {
      try {
        const response = await fetch(`/api/admin/accommodation/${editItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editItem),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const updatedItem = await response.json();

        setData((prevData) =>
          prevData.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );
        setEditItem(null); // Close the edit dialog
        setSnackbar({
          open: true,
          message: "Record updated successfully.",
          severity: "success",
        });
      } catch (error) {
        console.error("Error updating record:", error);
        setSnackbar({
          open: true,
          message: "Error updating record. Please check the console for details.",
          severity: "error",
        });
      }
    }
  };

  const handleEditCancel = () => {
    setEditItem(null); // Close the edit dialog without saving
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <Typography>Loading data...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f4f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#007bff", textAlign: "center" }}
      >
        Accommodation Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#007bff", color: "#ffffff" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Check-in Date</TableCell>
              <TableCell>Check-out Date</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
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
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open={Boolean(editItem)} onClose={handleEditCancel}>
          <DialogTitle>Edit Accommodation</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="First Name"
              value={editItem.firstName}
              onChange={(e) =>
                setEditItem({ ...editItem, firstName: e.target.value })
              }
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={editItem.lastName}
              onChange={(e) =>
                setEditItem({ ...editItem, lastName: e.target.value })
              }
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Nationality"
              value={editItem.nationality}
              onChange={(e) =>
                setEditItem({ ...editItem, nationality: e.target.value })
              }
              sx={{ marginBottom: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;