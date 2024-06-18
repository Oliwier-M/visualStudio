import Book from './Book';

interface Loan {
  id: number;
  loanDate: string;
  dueDate: string;
  retrieved: boolean;
  userId: User;
  bookId: Book;
}

export default Loan;
