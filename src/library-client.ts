import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  AddBookDto,
  AddBookResponseDto,
  BookResponseDto,
  LoanDto,
  LoanResponseDto,
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  UserDto,
} from './dto/login.dto';
import { jwtDecode } from 'jwt-decode';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
  }

  public getUserRole(token: string): string {
    try {
      const decodedToken: any = jwtDecode(token);
      const userRole: string = decodedToken.role; // Replace 'role' with the actual claim name for user role
      return userRole;
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }

  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto | null>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('/auth/register', data);

      console.log('data: ', data);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );

      const token = response.data.token;

      this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      console.log(response);

      const userRole = this.getUserRole(token);
      response.data.role = userRole;

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addLoan(
    data: LoanDto,
  ): Promise<ClientResponse<LoanResponseDto>> {
    try {
      const response: AxiosResponse<LoanResponseDto> = await this.client.post(
        '/loans',
        data,
      );

      // let loanDate = new Date();
      // let formattedLoanDate = loanDate.toISOString().slice(0, 10);
      // response.data.loanDate = new Date(formattedLoanDate);

      // response.data.loanDate = new Date();
      // response.data.retrieved = null;

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: {
          id: 0,
          loanDate: new Date('0000-00-00'),
          dueDate: new Date('0000-00-00'),
          retrieved: null,
          user: null,
          book: null,
        },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async returnLoan(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.post(
        `loans/return/${id}`,
      );

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `user/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBook(
    data: AddBookDto,
  ): Promise<ClientResponse<AddBookResponseDto>> {
    try {
      const response: AxiosResponse<AddBookResponseDto> =
        await this.client.post('/books', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: { id: 0, copies: 0 },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(): Promise<ClientResponse<BookResponseDto[]>> {
    try {
      const response = await this.client.get('/books');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: [],
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(id: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `books/delete/${id}`,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<LoanResponseDto[]>> {
    try {
      const response = await this.client.get('/loans');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: [],
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getUsers(): Promise<ClientResponse<UserDto[]>> {
    try {
      const response: AxiosResponse<UserDto[]> = await this.client.get('/user');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: [],
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getMyLoans(): Promise<ClientResponse<LoanResponseDto[] | null>> {
    try {
      const response = await this.client.get('/loans/mine');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
