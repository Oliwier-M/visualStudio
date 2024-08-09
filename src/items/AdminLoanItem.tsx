import { Box, Card, CardContent, Typography } from '@mui/material';
import Loan from '../interfaces/Loan';

interface LoanItemProps {
  loan: Loan;
}

const AdminLoanItem: React.FC<LoanItemProps> = ({ loan }) => {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: 50,
        maxHeight: 50,
        position: 'relative',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            user ID: {loan.user.id}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 3,
            }}
          >
            book ID: {loan.book.id}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 3,
            }}
          >
            loan ID: {loan.id}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 20,
            }}
          >
            Loan date: {loan.loanDate.toLocaleDateString()}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              marginLeft: 20,
            }}
          >
            Due date: {loan.dueDate.toLocaleDateString()}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              marginLeft: 10,
            }}
          >
            Retrieved:{' '}
            {loan.retrieved !== null
              ? loan.retrieved.toLocaleDateString()
              : 'false'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminLoanItem;
