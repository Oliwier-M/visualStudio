import Book from './Book';
import User from './User';

interface Loan {
  id: number;
  loanDate: Date;
  dueDate: Date;
  retrieved: Date | null;
  user: User;
  book: Book;
}

export default Loan;
