import { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import ColumnList from '../../lists/ColumnList';
import AdminLoanItem from '../../items/AdminLoanItem';
import { useApi } from '../../ApiProvider';
import { LoanResponseDto } from '../../dto/login.dto';
import Loan from '../../interfaces/Loan';

export default function AdminLoanList() {
  const apiClient = useApi();

  const [loansResolved, setLoansResolved] = useState<Loan[]>([]);
  const [loansInProgress, setLoansInProgress] = useState<Loan[]>([]);
  const [loansDisplayed, setLoansDisplayed] = useState<Loan[]>([]);
  const [defaultData, setDefaultData] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [allLoans, setAllLoans] = useState<Loan[]>([]);
  const [listMessage, setMessage] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await apiClient.getLoans();
        if (response.success && response.data) {
          const loans: Loan[] = response.data.map((loan: LoanResponseDto) => ({
            id: loan.id || 0,
            loanDate: loan.loanDate
              ? new Date(loan.loanDate)
              : new Date('1970-01-01'),
            dueDate: loan.dueDate
              ? new Date(loan.dueDate)
              : new Date('1970-01-01'),
            retrieved: loan.retrieved ? new Date(loan.retrieved) : null,
            user: loan.user ?? {
              id: 0,
              firstName: 'Unknown',
              lastName: 'Unknown',
              email: 'Unknown',
            },
            book: loan.book ?? {
              id: 0,
              isbn: 0,
              title: 'Unknown',
              author: 'Unknown',
              publisher: 'Unknown',
              year: 0,
              available: false,
              genre: 'Unknown',
              description: 'Unknown',
              image: 'Unknown',
              rating: 0,
            },
          }));

          const loansReturned = loans.filter((loan) => loan.retrieved !== null);
          const loansInProgress = loans.filter(
            (loan) => loan.retrieved === null,
          );

          setLoansResolved(loansReturned);
          setLoansInProgress(loansInProgress);
          setDefaultData(loansInProgress);
          setMessage('Loans in progress');
          setLoansDisplayed(loansInProgress); // Set the initial displayed loans to in-progress loans
          setAllLoans(loans);
        } else {
          setError('Failed to fetch loans');
        }
      } catch (error) {
        setError('An error occurred while fetching loans');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [apiClient]);

  const handleFilterButtonClick = () => {
    const userId = parseInt(filter, 10);

    const filteredInProgress = allLoans.filter(
      (loan) => loan.user.id === userId && loan.retrieved === null,
    );
    const filteredResolved = allLoans.filter(
      (loan) => loan.user.id === userId && loan.retrieved !== null,
    );

    setLoansInProgress(filteredInProgress);
    setLoansResolved(filteredResolved);
    setLoansDisplayed(filteredInProgress);
    setMessage('Loans in progress');
  };

  const handleResolvedFilter = () => {
    setMessage('Resolved loans');
    setLoansDisplayed(loansResolved);
  };

  const handleInProgressFilter = () => {
    setMessage('Loans in progress');
    setLoansDisplayed(loansInProgress);
  };

  const handleEraseFiltersButtonClick = () => {
    setLoansResolved(allLoans.filter((loan) => loan.retrieved !== null));
    setLoansInProgress(allLoans.filter((loan) => loan.retrieved === null));
    setLoansDisplayed(defaultData);
    setMessage('Loans in progress');
    setFilter('');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="List">
      <Box marginBottom={5} marginTop={2} marginLeft={2}>
        <TextField
          sx={{ width: 300 }}
          label="Filter by reader ID"
          placeholder="enter reader Id"
          value={filter}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ height: 55, marginLeft: 2 }}
          onClick={handleFilterButtonClick}
        >
          <Typography>Filter</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ height: 55, marginLeft: 2, marginRight: 2 }}
          onClick={handleEraseFiltersButtonClick}
        >
          <Typography>Erase filters</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ height: 55, marginRight: 2 }}
          onClick={handleInProgressFilter}
        >
          <Typography>Loans in progress</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ height: 55 }}
          onClick={handleResolvedFilter}
        >
          <Typography>Resolved loans</Typography>
        </Button>
      </Box>

      <Typography variant="h6" marginLeft={2}>
        {listMessage}
      </Typography>
      <Stack>
        <ColumnList>
          {loansDisplayed.map((loan) => (
            <AdminLoanItem key={loan.id} loan={loan} />
          ))}
        </ColumnList>
      </Stack>
    </div>
  );
}
