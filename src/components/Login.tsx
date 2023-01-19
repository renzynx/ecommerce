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
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { AUTH_ERROR } from "../lib/constants";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const goto = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErr({ ...err, email: "" });
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErr({ ...err, password: "" });
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
          goto("/");
        } else {
          setErr({
            email: "Invalid email or password",
            password: "Invalid email or password",
          });
        }
      } else {
        setErr({
          email: email ? "" : "Email is required",
          password: password ? "" : "Password is required",
        });
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

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (result) {
      goto("/");
    } else {
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
        Welcome to amogus store, login with
      </Typography>
      <Typography variant="h6">Credentials</Typography>
      <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <TextField
        value={email}
        onChange={handleEmailChange}
        variant="filled"
        label="Email"
        type="email"
        error={!!err.email}
        sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
        helperText={err.email}
      />
      <PasswordInput
        value={password}
        onChange={handlePasswordChange}
        variant="filled"
        label="Password"
        error={!!err.password}
        helperText={err.password}
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
          "@media (max-width: 605px)": {
            justifyContent: "center",
          },
        }}
      >
        <Link underline="hover" target="_blank" sx={{ cursor: "pointer" }}>
          Forgot password?
        </Link>
        <Link
          underline="hover"
          target="_blank"
          onClick={() => goto("/auth/register")}
          sx={{ cursor: "pointer" }}
        >
          Don&apos;t have an account?
        </Link>
        <Button
          onClick={handleLogin}
          size="large"
          variant="contained"
          sx={{ width: "10rem" }}
        >
          Login
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
        <Button size="large" variant="contained" onClick={handleGoogleLogin}>
          Login with Google
          <Google style={{ marginLeft: ".5rem" }} />
        </Button>
      </Box>
    </>
  );
};

export default Login;
