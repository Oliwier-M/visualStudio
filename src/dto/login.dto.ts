export class LoginDto {
  username: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  token: string | undefined;
}

export class BookResponseDto {
  id: number | undefined;
  isbn: number | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  year: number | undefined;
  available: boolean | undefined;
  genre: string | undefined;
  description: string | undefined;
  image: string | undefined;
  rating: number | undefined;
}

export class UserResponseDto {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export class LoanResponseDto {
  id: number | undefined;
  loanDate: Date | undefined;
  dueDate: Date | undefined;
  retrieved: boolean | undefined;
  user: UserResponseDto | undefined;
  book: BookResponseDto | undefined;
}
