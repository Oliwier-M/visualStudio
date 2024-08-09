import { Box, Card, CardContent, Typography } from '@mui/material';
import Loan from '../interfaces/Loan';

interface LoanItemProps {
  loan: Loan;
}

const LoanItem: React.FC<LoanItemProps> = ({ loan }) => {
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
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexGrow: 1,
            }}
          >
            {loan.book.title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 'auto',
            }}
          >
            Loan date: {loan.loanDate.toLocaleDateString()}
          </Typography>
          <Typography
            id="dueDate"
            variant="h6"
            component="div"
            sx={{
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 2,
            }}
          >
            Due date: {loan.dueDate.toLocaleDateString()}
          </Typography>
          <Typography
            id="dueDate"
            variant="h6"
            component="div"
            sx={{
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 2,
            }}
          >
            {loan.retrieved !== null ? 'Retrieved' : ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanItem;
