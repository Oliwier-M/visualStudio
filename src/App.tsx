import React from 'react';
import LoginForm from './login form/Login-form';
import HomePage from './pages/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import BooksList from './lists/BooksList';
import ApiProvider from './ApiProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="*" element={<h1>404</h1>} />

          <Route path="/home" element={<HomePage />}>
            <Route path="about" element={<AboutUs />} />
            <Route path="books" element={<BooksList />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}
