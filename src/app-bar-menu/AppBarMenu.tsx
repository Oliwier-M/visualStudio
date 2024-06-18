import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import React from 'react';
import { AccountCircle, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Home', 'Books', 'Loans', 'About us'];

export default function AppBarMenu() {
  const navigate = useNavigate();

  const pageActions: { [key: string]: string } = {
    Home: '/home',
    Books: 'books',
    Loans: 'loans',
    'About us': 'about',
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          // href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            flexGrow: 1,
          }}
        >
          eBookstore
        </Typography>

        <Box sx={{ marginRight: 3, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={pageActions[page]}
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleCloseNavMenu}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              component={Link}
              to="profile"
              onClick={handleCloseUserMenu}
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                navigate('/login');
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
