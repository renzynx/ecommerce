import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import { useTitle } from "../lib/hooks";

const Authentication = () => {
  useTitle("Authentication");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            padding: "3rem",
            border: `1px solid ${grey["700"]}`,
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Authentication;
