import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../ApiProvider';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { BookDto, UserDto } from '../../../dto/login.dto';

export default function BookActions() {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [id, setId] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const apiClient = useApi();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 50 },
    { field: 'isbn', headerName: 'Isbn', type: 'number', width: 100 },
    { field: 'title', headerName: 'Title', width: 100 },
    { field: 'author', headerName: 'Author', width: 100 },
    {
      field: 'yearPublished',
      headerName: 'Year Published',
      type: 'number',
      width: 50,
    },
    { field: 'publisher', headerName: 'Publisher', width: 180 },
    { field: 'description', headerName: 'Description', width: 180 },
    {
      field: 'availableCopies',
      headerName: 'Available Copies',
      type: 'number',
      width: 50,
    },
    { field: 'genre', headerName: 'Genre', width: 100 },
    { field: 'image', headerName: 'Image', width: 100 },
    { field: 'rating', headerName: 'Rating', type: 'number', width: 50 },
  ];

  async function fetchBooks() {
    const response = await apiClient.getBooks();
    if (response.success) {
      setBooks(response.data);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [apiClient]);

  console.log(books);

  async function deleteBook(id: number) {
    const response = await apiClient.deleteBook(id);
    if (response.success) {
      fetchBooks();
    }
  }

  async function handleDelete() {
    if (selectedIds.length > 0) {
      for (const id of selectedIds) {
        await deleteBook(id);
      }
      setSelectedIds([]);
    } else {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        await deleteBook(parsedId);
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 5 }}>
      <Box>
        <TextField
          id="id"
          label="Book ID"
          variant="outlined"
          placeholder="Enter book ID"
          value={id}
          sx={{ width: 120 }}
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: 100, height: 55, marginLeft: 2 }}
          onClick={handleDelete}
        >
          <Typography>Delete</Typography>
        </Button>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <DataGrid
          rows={books}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids) => setSelectedIds(ids as number[])}
        />
      </Box>
    </Box>
  );
}
