"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const AdminAuth = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (passcode === process.env.NEXT_PUBLIC_ADMIN_PASSCODE) {
      router.push("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid passcode.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Authentication
      </Typography>
      <TextField
        label="Admin Passcode"
        type="password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        sx={{ marginBottom: "20px", width: "300px" }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default AdminAuth;