import ListItem from '@mui/material/ListItem';
import React from 'react';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <>
      <ListItem>title: {book.title}</ListItem>
      <ListItem>author: {book.author}</ListItem>
      <ListItem>description: {book.description}</ListItem>
    </>
  );
};

export default BookItem;
