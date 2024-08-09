import { Box, Button, Typography } from '@mui/material';
import exp from 'constants';
import AppBarMenu from '../../app-bar-menu/AppBarMenu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../ApiProvider';
import { Book } from '@mui/icons-material';
import RegisterUser from './actions/Register-user';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeRoute = location.pathname === '/homeadm';

  if (!isHomeRoute) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBarMenu />
        <Outlet />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMenu />
      <Box sx={{ p: 2 }}>
        <div>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('register')}
          >
            <Typography>Register a new user</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('useract')}
          >
            <Typography>Manage users</Typography>
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('add-book')}
          >
            <Typography>Add a book</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('bookact')}
          >
            <Typography>Manage books</Typography>
          </Button>
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('add-loan')}
          >
            <Typography>Lend a book</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            onClick={() => navigate('return-loan')}
          >
            <Typography>Return a book</Typography>
          </Button>
          <Button variant="outlined" sx={{ margin: 1 }}>
            <Typography>Manage loans</Typography>
          </Button>
        </div>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
