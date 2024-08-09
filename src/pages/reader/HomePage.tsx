import { Box, Typography } from '@mui/material';
import exp from 'constants';
import AppBarMenu from '../../app-bar-menu/AppBarMenu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../ApiProvider';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiClient = useApi();


  apiClient.getMyLoans().then((response) => {
    console.log(response);
  });

  apiClient.getLoans().then((response) => {
    console.log(response);
  });

  // Check if the current route is exactly "/home"
  const isHomeRoute = location.pathname === '/home';

  // If it's not the exact home route but a nested route then
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
        <Typography variant="h4">Welcome to Our Website!</Typography>
        <Typography variant="body1">
          This is some basic information about our website. You can contact us
          at:
        </Typography>
        <Typography variant="body1">
          Email: example@example.com <br />
          Phone: 123-456-789
        </Typography>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
