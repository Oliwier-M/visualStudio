import exp from 'constants';
import Book from '../interfaces/Book';
import User from '../interfaces/User';

export class LoginDto {
  username!: string;
  password!: string;
}

export class RegisterDto {
  password!: string;
  role!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
}

export class LoginResponseDto {
  token!: string;
  role!: string;
}

export class RegisterResponseDto {
  userId!: number;
  email!: string;
  role!: string;
}

export class AddBookDto {
  isbn!: number;
  title!: string;
  author!: string;
  publisher!: string;
  year!: number;
  available!: number;
  genre!: string;
  description!: string;
  image!: string;
  rating!: number;
}

export class AddBookResponseDto {
  id!: number;
  copies!: number;
}

export class BookResponseDto {
  id!: number;
  isbn!: number;
  title!: string;
  author!: string;
  publisher!: string;
  year!: number;
  available!: number;
  genre!: string;
  description!: string;
  image!: string;
  rating!: number;
}

export class UserResponseDto {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
}

export class LoanResponseDto {
  id!: number;
  loanDate!: Date;
  dueDate!: Date;
  retrieved!: Date | null;
  user!: User | null;
  book!: Book | null;
}

export class UserDto {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
}

export class BookDto {
  id!: number;
  isbn!: number;
  title!: string;
  author!: string;
  publisher!: string;
  year!: number;
  available!: number;
  genre!: string;
  description!: string;
  image!: string;
  rating!: number;
}

export class LoanDto {
  dueDate!: Date;
  userId!: number;
  bookId!: number;
}
