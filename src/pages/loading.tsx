import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots < 3) {
        setDots(dots + 1);
      } else {
        setDots(0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [dots]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: "1rem",
      }}
    >
      <CircularProgress size={50} />
      <Typography variant="h5" sx={{ marginLeft: "1rem" }}>
        Loading{`...`.slice(0, dots)}
      </Typography>
    </Box>
  );
};

export default Loading;
