import React from 'react';
import LoginForm from './login form/Login-form';
import HomePage from './pages/reader/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import BooksList from './pages/reader/BooksList';
import ApiProvider from './ApiProvider';
import LoanList from './pages/reader/LoanList';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminLoanList from './pages/admin/AdminLoanList';
import RegisterUser from './pages/admin/actions/Register-user';
import UserActions from './pages/admin/actions/UserActions';
import BookActions from './pages/admin/actions/BookActions';
import AddBook from './pages/admin/actions/AddBook';
import LendBook from './pages/admin/actions/LendBook';
import ReturnBook from './pages/admin/actions/ReturnBook';

export default function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="*" element={<h1>404</h1>} />

          <Route path="/home" element={<HomePage />}>
            <Route path="about" element={<AboutUs />} />
            <Route path="books" element={<BooksList />} />
            <Route path="loans" element={<LoanList />} />
          </Route>
          <Route path="/homeadm" element={<AdminHomePage />}>
            <Route path="register" element={<RegisterUser />} />
            <Route path="useract" element={<UserActions />} />
            <Route path="bookact" element={<BookActions />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="add-loan" element={<LendBook />} />
            <Route path="return-loan" element={<ReturnBook />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="books" element={<BooksList />} />
            <Route path="loans" element={<AdminLoanList />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}
