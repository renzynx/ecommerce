import { FC } from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonBox: FC<{ quantity?: number }> = ({ quantity = 1 }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "1rem",
        margin: 0,
      }}
    >
      <Skeleton sx={{ padding: 0, margin: 0 }} width="8rem" height="1.3rem" />
      {Array.from(Array(quantity).keys()).map((i) => (
        <Skeleton key={i} sx={{ padding: 0, margin: 0 }} height="5rem" />
      ))}
    </Box>
  );
};

export default SkeletonBox;