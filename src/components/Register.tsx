import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { AUTH_ERROR } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const Register = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleRegister = async () => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        alert("Please enter your email and password.");
      }
    } catch (error) {
      const e = error as any;
      switch (e.code) {
        case "auth/user-not-found":
          setErr({ ...err, email: AUTH_ERROR["EMAIL_NOT_FOUND"] });
          break;
        case "auth/invalid-password":
          setErr({ ...err, password: AUTH_ERROR["INVALID_PASSWORD"] });
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
        Welcome to amogus store, register with
      </Typography>
      <Typography variant="h6">Credentials</Typography>
      <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <TextField
        value={email}
        onChange={handleEmailChange}
        variant="filled"
        label="Email"
        type="email"
        sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
      />
      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        label="Password"
        sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "1rem",
          "@media (max-width: 480px)": {
            justifyContent: "center",
          },
        }}
      >
        <Link
          underline="hover"
          target="_blank"
          onClick={() => goto("/auth/login")}
          sx={{ cursor: "pointer" }}
        >
          Already have an account?
        </Link>
        <Button
          onClick={handleRegister}
          size="large"
          variant="contained"
          sx={{ width: "10rem" }}
        >
          Register
        </Button>
      </Box>
      <Divider orientation="vertical" flexItem>
        <Typography variant="h5">OR</Typography>
      </Divider>
      <Typography variant="h6">OAuth</Typography>
      <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Button size="large" variant="contained">
          Register with Google
          <Google style={{ marginLeft: ".5rem" }} />
        </Button>
      </Box>
    </>
  );
};

export default Register;
