import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useApi } from '../../../ApiProvider';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';

type FormValues = {
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  available: number;
  genre: string;
  description: string;
  image: string;
  rating: number;
};

export default function AddBook() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      apiClient.addBook(values).then((response) => {
        console.log('values: ', values);
        console.log('response: ', response);
        if (response.success) {
          navigate('/homeadm');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        isbn: yup
          .number()
          .required('Isbn is mandatory')
          .test(
            'len',
            'ISBN must be exactly 13 digits',
            (val) => val.toString().length === 13,
          ),
        title: yup.string().required('Title is mandatory'),
        author: yup.string().required('Author is mandatory'),
        publisher: yup.string().required('Publisher is mandatory'),
        year: yup
          .string()
          .required('Year is mandatory')
          .test(
            'len',
            'Year must be in 4 digits',
            (val) => val.toString().length === 4,
          ),
        available: yup.number().required('Available copies are needed'),
        genre: yup.string().required('Genre is mandatory'),
        description: yup.string().required('Description is mandatory'),
        image: yup
          .string()
          .required('Image http link of a book cover is needed'),
        rating: yup.number().default(0),
      }),
    [],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={{
            isbn: 0,
            title: '',
            author: '',
            publisher: '',
            year: 0,
            available: 0,
            genre: '',
            description: '',
            image: '',
            rating: 0,
          }}
          onSubmit={submit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {(formik: any) => (
            <Form
              id="AddBook"
              className="Add-book"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <TextField
                id="isbn"
                label="isbn"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.isbn && !!formik.errors.isbn}
                helperText={formik.touched.isbn && formik.errors.isbn}
              />
              <TextField
                id="title"
                label="title"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                id="author"
                label="author"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.author && !!formik.errors.author}
                helperText={formik.touched.author && formik.errors.author}
              />
              <TextField
                id="publisher"
                label="publisher"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.publisher && !!formik.errors.publisher}
                helperText={formik.touched.publisher && formik.errors.publisher}
              />
              <TextField
                id="year"
                label="year"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.year && !!formik.errors.year}
                helperText={formik.touched.year && formik.errors.year}
              />
              <TextField
                id="available"
                label="available"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.available && !!formik.errors.available}
                helperText={formik.touched.available && formik.errors.available}
              />
              <TextField
                id="genre"
                label="genre"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.genre && !!formik.errors.genre}
                helperText={formik.touched.genre && formik.errors.genre}
              />
              <TextField
                id="description"
                label="description"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                id="image"
                label="image"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.image && !!formik.errors.image}
                helperText={formik.touched.image && formik.errors.image}
              />
              <TextField
                id="rating"
                label="rating"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rating && !!formik.errors.rating}
                helperText={formik.touched.rating && formik.errors.rating}
              />

              <Button
                variant="contained"
                sx={{ width: 200, height: 60 }}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                form="AddBook"
              >
                <Typography fontSize={24}>Add</Typography>
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
