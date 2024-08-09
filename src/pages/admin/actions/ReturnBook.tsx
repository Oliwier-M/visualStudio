import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../ApiProvider';
import * as yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoanDto, LoanResponseDto } from '../../../dto/login.dto';
import Loan from '../../../interfaces/Loan';
import ColumnList from '../../../lists/ColumnList';
import AdminLoanItem from '../../../items/AdminLoanItem';

export default function ReturnBook() {
  const [loans, setLoans] = useState<LoanResponseDto[]>([]);
  const [allLoans, setAllLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  const apiClient = useApi();

  const [loansInProgress, setLoansInProgress] = useState<Loan[]>([]);

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

        const loansInProgress = loans.filter((loan) => loan.retrieved === null);

        setLoansInProgress(loansInProgress);
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

  useEffect(() => {
    fetchLoans();
  }, [apiClient]);

  async function handleReturn(id: number) {
    const response = await apiClient.returnLoan(id);
    console.log(response);
    if (response.success) {
      fetchLoans();
      console.log(fetchLoans);
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Box marginBottom={5} marginTop={2} marginLeft={2}>
        <TextField
          id="id"
          label="loan ID"
          variant="outlined"
          placeholder="Enter loan ID"
          value={filter}
          onChange={handleFilterChange}
        />
        <Button
          variant="contained"
          sx={{ width: 100, height: 55, marginLeft: 4 }}
          onClick={() => {
            console.log(filter);
            const parsedId = parseInt(filter, 10);
            console.log('id: ', parsedId);
            handleReturn(parsedId);
          }}
        >
          <Typography fontSize={24}>Return</Typography>
        </Button>
      </Box>

      <Stack>
        <ColumnList>
          {loansInProgress.map((loan) => (
            <AdminLoanItem key={loan.id} loan={loan} />
          ))}
        </ColumnList>
      </Stack>
    </div>
  );
}
