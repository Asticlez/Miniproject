"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

type Profile = {
  name: string;
  email: string;
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState<Profile>({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch profile data from API
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch profile (Status: ${res.status})`);
        return res.json();
      })
      .then((data: Profile) => {
        setProfile(data);
        setFormData(data);
      })
      .catch((err) => console.error("Error fetching profile:", err.message));
  }, []);

  const handleEditToggle = () => setEditable(!editable);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to save profile (Status: ${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setEditable(false);
      })
      .catch((err) => console.error("Error saving profile:", err.message));
  };

  if (!profile) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#ffffff"
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            borderRadius: "5px",
            color: "#ffffff",
          }}
        >
          Loading profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#ffffff"
      padding={2}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Profile
            </Typography>
            <Button
              variant={editable ? "contained" : "outlined"}
              color="primary"
              onClick={handleEditToggle}
            >
              {editable ? "Cancel" : "Edit"}
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    bgcolor: "#007bff",
                    width: 120,
                    height: 120,
                    fontSize: "3rem",
                    color: "#ffffff",
                  }}
                >
                  {profile?.name?.charAt(0)?.toUpperCase() || "?"}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editable}
                    variant={editable ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!editable}
                    variant={editable ? "outlined" : "filled"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {editable && (
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;