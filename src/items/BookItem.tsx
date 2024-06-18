import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import Book from '../interfaces/Book';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <Card
      sx={{
        minWidth: 230,
        maxWidth: 230,
        minHeight: 400,
        maxHeight: 420,
        position: 'relative',
      }}
    >
      <CardMedia sx={{ height: 280 }} image={book.image} title={book.title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Typography
            variant="h6"
            component="div"
            sx={{
              margin: '0 0 5px 0',
              fontSize: '1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {book.title}
          </Typography>
          <Typography fontSize={14} component="div">
            {book.author}, {book.year}
          </Typography>
          <Typography gutterBottom fontSize={12} color="text.secondary">
            {book.genre}
          </Typography>
        </div>
        <Rating
          name="read-only"
          value={book.rating}
          readOnly
          sx={{ position: 'absolute', bottom: 5, left: 8, right: 0 }}
        />
      </CardContent>
    </Card>
  );
};

export default BookItem;
