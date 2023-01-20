import { ChangeEvent, useState } from "react";
import { Box, Typography } from "@mui/material";
import PasswordInput from "../layouts/PasswordInput";

const ChangePassword = () => {
  const [err, setErr] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErr({ ...err, oldPassword: "" });
    setPassword({ ...password, oldPassword: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErr({
      ...err,
      password: "",
    });
    setPassword({ ...password, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErr({
      ...err,
      confirmPassword: "",
    });
    setPassword({ ...password, confirmPassword: e.target.value });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Typography variant="h6">Change Password</Typography>
      <PasswordInput
        fullWidth
        label="Current Password"
        name="oldPassword"
        error={!!err.oldPassword}
        helperText={err.oldPassword}
        onChange={handleOldPasswordChange}
        value={password.oldPassword}
      />
      <PasswordInput
        fullWidth
        label="Password"
        name="password"
        error={!!err.password}
        helperText={err.password}
        onChange={handlePasswordChange}
        value={password.password}
      />
      <PasswordInput
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        error={!!err.confirmPassword}
        helperText={err.confirmPassword}
        onChange={handleConfirmPasswordChange}
        value={password.confirmPassword}
      />
    </Box>
  );
};

export default ChangePassword;
