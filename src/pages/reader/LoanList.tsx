import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import ColumnList from '../../lists/ColumnList';
import LoanItem from '../../items/LoanItem';
import { useApi } from '../../ApiProvider';
import { LoanResponseDto } from '../../dto/login.dto';
import Loan from '../../interfaces/Loan';

export default function LoanList() {
  const apiClient = useApi();

  apiClient.getMyLoans().then((response) => {
    console.log(response);
  });

  const [loansBeforeDueDate, setLoansBeforeDueDate] = useState<Loan[]>([]);
  const [loansAfterDueDate, setLoansAfterDueDate] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

          const now = new Date();
          const beforeDueDate = loans.filter(
            (loan) => loan.dueDate && loan.dueDate > now,
          );
          const afterDueDate = loans.filter(
            (loan) => loan.dueDate && loan.dueDate <= now,
          );

          setLoansBeforeDueDate(beforeDueDate);
          setLoansAfterDueDate(afterDueDate);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="List">
      <Typography variant="h6">Loans Before Due Date</Typography>
      <Stack>
        <ColumnList>
          {loansBeforeDueDate.map((loan) => (
            <LoanItem key={loan.id} loan={loan} />
          ))}
        </ColumnList>
      </Stack>

      <Typography variant="h6">Loans After Due Date</Typography>
      <Stack>
        <ColumnList>
          {loansAfterDueDate.map((loan) => (
            <LoanItem key={loan.id} loan={loan} />
          ))}
        </ColumnList>
      </Stack>
    </div>
  );
}
