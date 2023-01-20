import { Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTitle } from "../lib/hooks";

const Authentication = () => {
  useTitle("Authentication");

  return (
    <>
      <Paper
        elevation={1}
        variant="outlined"
        sx={{
          flexGrow: 1,
          padding: "3rem",
          borderRadius: "1rem",
          maxWidth: "620px",
          margin: "1rem auto 1rem auto",
          "@media (max-width: 600px)": {
            width: "95%",
            padding: "1.5rem",
          },
        }}
      >
        <Outlet />
      </Paper>
    </>
  );
};

export default Authentication;
