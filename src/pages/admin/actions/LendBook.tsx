import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../ApiProvider';
import * as yup from 'yup';
import { useCallback, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';

type FormValues = {
  dueDate: Date;
  userId: number;
  bookId: number;
};

export default function LendBook() {
  const { addDays, format } = require('date-fns');
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      apiClient.addLoan(values).then((response) => {
        console.log('values: ', values);
        console.log('response: ', response);
        if (response.success) {
          navigate('/homeadm');
        }
      });
    },
    [apiClient, navigate],
  );

  const today = new Date();
  const minDueDate = format(addDays(today, 14), 'yyyy-MM-dd');

  const validationSchema = useMemo(
    () =>
      yup.object({
        dueDate: yup
          .date()
          .min(today, `Due date must be today or later`)
          .min(minDueDate, `Due date must be at least 14 days from today`)
          .required("Due date can't be empty")
          .transform(function (value, originalValue) {
            return this.isType(value) ? value : null;
          }),
        userId: yup.number().required("User ID can't be empty"),
        bookId: yup.number().required("Book ID can't be empty"),
      }),
    [],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Formik
        initialValues={{
          dueDate: new Date('0000-00-00'),
          userId: 0,
          bookId: 0,
        }}
        onSubmit={submit}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
      >
        {(formik: any) => (
          <Form
            id="AddLoan"
            className="Add-loan"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: 200,
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <TextField
                  id="dueDate"
                  label="dueDate"
                  variant="outlined"
                  placeholder="YYYY-MM-DD"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dueDate && !!formik.errors.dueDate}
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
                <TextField
                  id="userId"
                  label="user ID"
                  variant="outlined"
                  placeholder="Enter user ID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.userId && !!formik.errors.userId}
                  helperText={formik.touched.userId && formik.errors.userId}
                />
                <TextField
                  id="bookId"
                  label="book ID"
                  variant="outlined"
                  placeholder="Enter book ID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bookId && !!formik.errors.bookId}
                  helperText={formik.touched.bookId && formik.errors.bookId}
                />

                <Button
                  variant="contained"
                  sx={{ width: 200, height: 60 }}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  form="AddLoan"
                >
                  <Typography fontSize={24}>Add</Typography>
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
