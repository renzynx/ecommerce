import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Cart from "@mui/icons-material/ShoppingCart";
import { NavLink, useNavigate } from "react-router-dom";
import { memo, MouseEvent, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Logout, Settings } from "@mui/icons-material";
import { useIsAuth } from "../../lib/hooks";

const Navbar = () => {
  const { user, loading } = useIsAuth();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Cart">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Cart />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to="/">{import.meta.env.VITE_STORE_NAME}</NavLink>
            </Typography>
            {loading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : user ? (
              <DropdownMenu uid={user.uid!} username={user.displayName!} />
            ) : (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button color="primary" variant="contained">
                  <NavLink to="/auth/login">Login</NavLink>
                </Button>
                <Button color="primary" variant="contained">
                  <NavLink to="/auth/register">Register</NavLink>
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

const DropdownMenu = memo(
  ({ uid, username }: { uid: string; username?: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLElement>) =>
      setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const handleSignOut = async () => {
      await signOut(auth);
    };

    return (
      <>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="your avatar"
              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${uid}`}
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/account")}>
            <Avatar
              src={`https://api.dicebear.com/5.x/identicon/svg?seed=${uid}`}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              My account
            </Typography>
            {username ? (
              <Typography
                variant="caption"
                sx={{ ml: 2, color: "text.secondary" }}
              >
                @{username}
              </Typography>
            ) : null}
          </MenuItem>
          <Divider />

          <MenuItem onClick={() => navigate("/settings")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }
);

export default Navbar;
