import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { SessionUser } from "../../lib/types";
import { useAppDispatch } from "../../app/store";
import { auth } from "../../lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { setUser } from "../../features/auth.slice";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Check, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { redactEmail } from "../../lib/utils";

const ChangeInfo: FC<{ user: SessionUser }> = ({ user }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          setOpen(true);
          setSent(true);
        })
        .catch((err) => {
          setError(true);
          setOpen(true);
          setSent(false);
        });
    } else {
      return;
    }
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {sent
            ? "Verification email sent!"
            : "Error sending verification email"}
        </Alert>
      </Snackbar>
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
        <Button
          variant="contained"
          color={user.emailVerified ? "success" : "warning"}
          startIcon={user.emailVerified ? <Check /> : <Close />}
          sx={{ height: "3rem", fontSize: "1rem" }}
          onClick={handleClick}
          disabled={sent}
        >
          {user.emailVerified
            ? "Your email address is verified"
            : "Verify your email address"}
        </Button>
      </Box>
    </>
  );
};

export default ChangeInfo;