import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import GeneralList from './GenList';
import BookItem from '../items/BookItem';
import { useApi } from '../ApiProvider';
import Book from '../interfaces/Book';
import { BookResponseDto } from '../dto/login.dto';

export default function BooksList() {
  const [booksByGenre, setBooksByGenre] = useState<{ [genre: string]: Book[] }>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.getBooks();
        if (response.success && response.data) {
          const books: Book[] = response.data.map((book: BookResponseDto) => ({
            id: book.id || 0,
            isbn: book.isbn || 0,
            title: book.title || 'Untitled',
            author: book.author || 'Unknown',
            publisher: book.publisher || 'Unknown',
            year: book.year || 0,
            available: book.available ?? false,
            genre: book.genre || 'Unknown',
            description: book.description || 'No description',
            image: book.image || '',
            rating: book.rating || 0,
          }));
          setBooksByGenre(groupBooksByGenre(books));
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        setError('An error occurred while fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiClient]);

  const groupBooksByGenre = (books: Book[]): { [genre: string]: Book[] } => {
    return books.reduce(
      (acc, book) => {
        const genre = book.genre;
        if (!acc[genre]) {
          acc[genre] = [];
        }
        acc[genre].push(book);
        return acc;
      },
      {} as { [genre: string]: Book[] },
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="List">
      {Object.keys(booksByGenre).map((genre) => (
        <div key={genre}>
          <Typography variant="h6">{genre}</Typography>
          <Stack>
            <GeneralList>
              {booksByGenre[genre].map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </GeneralList>
          </Stack>
        </div>
      ))}
    </div>
  );
}

// const mockBooks: Book[] = [
//   {
//     id: 1,
//     isbn: 9780743273565,
//     title: 'The Great Gatsby',
//     author: 'F. Scott Fitzgerald',
//     publisher: 'Scribner',
//     year: 1925,
//     available: true,
//     genre: 'Fiction',
//     description:
//       'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
//     image:
//       'https://th.bing.com/th/id/R.e7a36747d2af43e6bcf2d8e988ec09d3?rik=WTbWJYmQnThk7Q&pid=ImgRaw&r=0',
//     rating: 4.6,
//   },
//   {
//     id: 4,
//     isbn: 9781503290563,
//     title: 'Pride and Prejudice',
//     author: 'Jane Austen',
//     publisher: 'CreateSpace Independent Publishing Platform',
//     year: 1813,
//     available: true,
//     genre: 'Classics',
//     description:
//       'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
//     image:
//       'https://tse1.explicit.bing.net/th/id/OIP.wcZjPkH4FZD5QYi_2kfxxAAAAA?rs=1&pid=ImgDetMain',
//     rating: 4.8,
//   },
//   {
//     id: 5,
//     isbn: 9781503280786,
//     title: 'Moby Dick',
//     author: 'Herman Melville',
//     publisher: 'CreateSpace Independent Publishing Platform',
//     available: true,
//     year: 1851,
//     genre: 'Adventure',
//     description:
//       "The narrative of Captain Ahab's obsessive quest to seek revenge on the white whale Moby Dick.",
//     image:
//       'https://tse1.mm.bing.net/th/id/OIP.jXo4y_vhCQg1G_tSiNy5ZQHaLu?rs=1&pid=ImgDetMain',
//     rating: 4.1,
//   },
//   {
//     id: 6,
//     isbn: 9780316769488,
//     title: 'The Catcher in the Rye',
//     author: 'J.D. Salinger',
//     publisher: 'Little, Brown and Company',
//     available: true,
//     year: 1951,
//     genre: 'Fiction',
//     description:
//       'The story of a few days in the life of Holden Caulfield, a 16-year-old boy who has been expelled from prep school.',
//     image:
//       'https://tse2.mm.bing.net/th/id/OIP.PQKfkZFKgDWeNleDPTi9dwHaK4?rs=1&pid=ImgDetMain',
//     rating: 3.7,
//   },
//   {
//     id: 7,
//     isbn: 9780060850524,
//     title: 'Brave New World',
//     author: 'Aldous Huxley',
//     publisher: 'Harper Perennial Modern Classics',
//     available: true,
//     year: 1932,
//     genre: 'Science Fiction',
//     description:
//       'A dystopian novel that explores the dangers of totalitarianism, technology, and losing individuality.',
//     image:
//       'https://tse3.mm.bing.net/th/id/OIP.DgsgJAGl9LdQnsrbh0Y-owHaLO?rs=1&pid=ImgDetMain',
//     rating: 4.3,
//   },
//   {
//     id: 8,
//     isbn: 9781400079988,
//     title: 'War and Peace',
//     author: 'Leo Tolstoy',
//     publisher: 'Vintage',
//     available: true,
//     year: 1869,
//     genre: 'Historical Fiction',
//     description:
//       'A novel that intertwines the lives of private and public individuals during the time of the Napoleonic wars.',
//     image:
//       'https://th.bing.com/th/id/R.20a6c169f4b86ceb597c1be7af21b3cc?rik=RFBxhy9pj%2bx9HQ&pid=ImgRaw&r=0',
//     rating: 4.4,
//   },
//   {
//     id: 9,
//     isbn: 9780547928227,
//     title: 'The Hobbit',
//     author: 'J.R.R. Tolkien',
//     publisher: 'Mariner Books',
//     available: true,
//     year: 1937,
//     genre: 'Fantasy',
//     description:
//       'The adventure of Bilbo Baggins as he journeys to the Lonely Mountain with a group of dwarves to reclaim their treasure.',
//     image:
//       'https://tse4.mm.bing.net/th/id/OIP.Js66vo-tf_LwdF3p4PegQQHaLX?rs=1&pid=ImgDetMain',
//     rating: 4.7,
//   },
//   {
//     id: 10,
//     isbn: 9780141441146,
//     title: 'Jane Eyre',
//     author: 'Charlotte Brontë',
//     publisher: 'Penguin Classics',
//     available: true,
//     year: 1847,
//     genre: 'Romance',
//     description:
//       'The experiences of its eponymous heroine, including her growth to adulthood and her love for Mr. Rochester.',
//     image:
//       'https://tse4.mm.bing.net/th/id/OIP.cRhpwvaIKExPUSaErWYzgQHaLn?rs=1&pid=ImgDetMain',
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     isbn: 9780061120084,
//     title: 'To Kill a Mockingbird',
//     author: 'Harper Lee',
//     publisher: 'Harper Perennial Modern Classics',
//     available: true,
//     year: 1960,
//     genre: 'Classics',
//     description:
//       'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
//     image:
//       'https://th.bing.com/th/id/R.5b59e0885d8091068eefc098f720b51d?rik=DY%2fqFLat2l4G0Q&pid=ImgRaw&r=0',
//     rating: 3.9,
//   },
//   {
//     id: 3,
//     isbn: 9780451524935,
//     title: '1984',
//     author: 'George Orwell',
//     publisher: 'Signet Classic',
//     available: true,
//     year: 1949,
//     genre: 'Science Fiction',
//     description:
//       'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
//     image:
//       'https://th.bing.com/th/id/OIP._WBrLuSKZEzZNUBrA7uX7QAAAA?rs=1&pid=ImgDetMain',
//     rating: 4.2,
//   },
// ];

//   return (
//     <div className="List">
//       <Stack>
//         <GeneralList>
//           {mockBooks.map((book) => (
//             <BookItem key={book.id} book={book} />
//           ))}
//         </GeneralList>
//       </Stack>
//     </div>
//   );
// }
