import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth.slice";
import ChangePassword from "./ChangePassword";
import SkeletonBox from "./SkeletonBox";
import ChangeInfo from "./ChangeInfo";

const AccountPage = () => {
  const { user, loading } = useSelector(selectAuth);

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "1rem",
        }}
      >
        <Typography variant="h5">Account</Typography>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {loading || !user ? (
            <>
              <SkeletonBox quantity={3} />
              <SkeletonBox quantity={3} />
            </>
          ) : (
            <>
              <ChangeInfo user={user} />
              <ChangePassword />
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: "1rem",
            width: "90%",
            background: "green",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="info"
            sx={{ height: "3rem", fontSize: "1.1rem" }}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;
