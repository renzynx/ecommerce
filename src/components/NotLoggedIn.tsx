import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTitle } from "../lib/hooks";
import { useSelector } from "react-redux";
import { selectLoading } from "../features/auth.slice";

const NotLoggedIn = () => {
  const loading = useSelector(selectLoading);
  useTitle("403 - Forbidden", !loading);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
          maxWidth: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          height: "80vh",
        }}
      >
        <Typography variant="h3" align="center">
          You are not logged in
        </Typography>
        <Box sx={{ width: "10rem" }}>
          <Button variant="contained" size="large" fullWidth>
            <NavLink to="/auth/login">Login</NavLink>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NotLoggedIn;
