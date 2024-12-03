"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, TextField } from "@mui/material";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from Prisma via API
  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setFormData({ name: data.name, email: data.email });
        setLoading(false);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      setError("Error fetching profile.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEditMode(false);
        setError(null);
      } else {
        setError("Failed to save profile data.");
      }
    } catch (err) {
      setError("Error saving profile data.");
    }
  };

  const handleCancel = () => {
    fetchProfile(); // Reset to original data
    setEditMode(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 36,
              backgroundColor: "#007bff",
              margin: "0 auto",
            }}
          >
            {formData.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          Profile
        </Typography>
        {error && (
          <Typography
            variant="body1"
            sx={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </Typography>
        )}
        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{ marginBottom: "10px", color: "#000", fontSize: "16px" }}
            >
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "20px", color: "#000", fontSize: "16px" }}
            >
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditMode(true)}
                sx={{ textTransform: "none" }}
              >
                Edit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Profile;