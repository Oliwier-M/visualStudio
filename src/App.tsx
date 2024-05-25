import React from 'react';
import LoginForm from './login form/Login-form';
import GeneralList from './GeneralList';
import BookItem from './books/BookItem';
import Book from './interfaces/Book';

// npm start !!!!!!!!!!!!!!!!!!!!

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'title 1',
    author: 'author 1',
    description: 'sjnfaieugrreadve',
    year: 1895,
  },
  {
    id: 2,
    title: 'title 2',
    author: 'author 2',
    description: 'sjnfaieugrreadasfdsdfsdfsdfdsve',
    year: 1894,
  },
  {
    id: 3,
    title: 'title1',
    author: 'author3',
    description: 'sjnfaieugrrasasxzcxbcvbxvcvbxcbxceadve',
    year: 2003,
  },
];

function App() {
  return (
    <div className="List">
      <GeneralList>
        {mockBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </GeneralList>
    </div>

    // <div className="App">
    //   <LoginForm />
    // </div>
  );
}

export default App;
