import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useTitle } from "../lib/hooks";

const ErrorPage: FC<{ error?: string; link?: string }> = ({ error, link }) => {
  const goto = useNavigate();
  useTitle(error ?? "Error");

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography align="center" variant="h3">
          {error ? error : "Oops! Something went wrong."}
        </Typography>
        <Button
          onClick={() => goto(link ?? "/")}
          variant="contained"
          size="large"
        >
          Go back
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
