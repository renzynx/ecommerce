import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { ChangeEvent, FC, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { AUTH_ERROR } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../layouts/PasswordInput";
import { formatFirebaseError } from "../../lib/utils";

const AuthPage: FC<{ initType: "login" | "register" }> = ({ initType }) => {
  const goto = useNavigate();
  const [type, setType] = useState<"login" | "register">(initType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<Record<string, string>>({
    name: "",
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

  const handleAuth = async () => {
    try {
      if (email && password) {
        const user =
          type === "login"
            ? await signInWithEmailAndPassword(auth, email, password)
            : await createUserWithEmailAndPassword(auth, email, password);
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
      console.log(e.message);
      const formatted = formatFirebaseError(e.message);
      console.log(formatted);
      switch (e.code) {
        case "auth/user-not-found":
          setErr({ ...err, email: AUTH_ERROR["EMAIL_NOT_FOUND"] });
          break;
        case "auth/invalid-password":
          setErr({ ...err, password: AUTH_ERROR["INVALID_PASSWORD"] });
          break;
        case "auth/invalid-email":
          setErr({ ...err, email: AUTH_ERROR.INVALID_EMAIL });
          break;
        case "auth/email-already-in-use":
          setErr({ ...err, email: AUTH_ERROR.EMAIL_EXISTS });
          break;
        case "auth/weak-password":
          setErr({ ...err, password: formatted });
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
        Welcome to {import.meta.env.VITE_STORE_NAME},{" "}
        {type === "login" ? "login" : "register"} with
      </Typography>
      <Typography variant="h6">Credentials</Typography>
      <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />

      <TextField
        required
        fullWidth
        value={email}
        onChange={handleEmailChange}
        variant="filled"
        label="Email"
        type="email"
        error={!!err.email}
        helperText={err.email}
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
      />
      <PasswordInput
        required
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        variant="filled"
        label="Password"
        error={!!err.password}
        helperText={err.password}
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
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
        {type === "login" && (
          <Link
            underline="hover"
            target="_blank"
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Forgot password?
          </Link>
        )}
        <Link
          underline="hover"
          target="_blank"
          variant="body2"
          onClick={() => {
            setType(type === "login" ? "register" : "login");
            goto(`/auth/${type === "login" ? "register" : "login"}`);
          }}
          sx={{ cursor: "pointer" }}
        >
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Link>

        <Button
          onClick={handleAuth}
          size="large"
          variant="contained"
          sx={{ width: "10rem" }}
        >
          {type === "login" ? "Login" : "Register"}
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
        <Button
          endIcon={<Google />}
          size="large"
          variant="contained"
          onClick={handleGoogleLogin}
        >
          {type === "login" ? "Login" : "Register"} with Google
        </Button>
      </Box>
    </>
  );
};

export default AuthPage;
