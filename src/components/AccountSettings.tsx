import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth, setUser } from "../features/auth.slice";
import { redactEmail } from "../lib/utils";
import { useAppDispatch } from "../app/store";
import { ChangeEvent, FC, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { User } from "firebase/auth";
import PasswordInput from "./PasswordInput";

const AccountSettings = () => {
  const { user, loading } = useSelector(selectAuth);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "1rem",
        }}
      >
        <Typography variant="h5">Account</Typography>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {loading || !user ? (
            <>
              <SkeletonBox />
              <SkeletonBox />
            </>
          ) : (
            <>
              <InputBoxes user={user} />
              <ChangePasswordInput />
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: "1rem",
            width: "90%",
            background: "green",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="warning"
            sx={{ height: "3rem", fontSize: "1.1rem" }}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </>
  );
};

const InputBoxes: FC<{ user: Partial<User> }> = ({ user }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const dispatch = useAppDispatch();

  const handleClickShowEmail = () => setShowEmail(!showEmail);
  const handleMouseDownEmail = () => setShowEmail(!showEmail);

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setUser({
        ...user,
        displayName: e.target.value,
      })
    );
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErr("");
    dispatch(
      setUser({
        ...user,
        email: e.target.value,
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Typography variant="h6">Change Info</Typography>
        <TextField
          fullWidth
          label="Display Name"
          name="display_name"
          variant="filled"
          onChange={handleDisplayNameChange}
          value={user.displayName ?? ""}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="filled"
          error={!!emailErr}
          helperText={emailErr}
          onFocus={() => setShowEmail(true)}
          onChange={handleEmailChange}
          value={
            user?.email
              ? showEmail
                ? user.email
                : redactEmail(user.email)
              : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowEmail}
                  onMouseDown={handleMouseDownEmail}
                >
                  {showEmail ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

const ChangePasswordInput = () => {
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

const SkeletonBox = () => {
  return (
    <>
      <Skeleton height="6rem" sx={{ marginTop: "-1rem", flexGrow: 1 }} />
    </>
  );
};

export default AccountSettings;
