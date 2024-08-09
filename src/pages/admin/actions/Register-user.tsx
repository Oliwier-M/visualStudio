import { Box, Button, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import AppBarMenu from '../../../app-bar-menu/AppBarMenu';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../ApiProvider';

type FormValues = {
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function RegisterUser() {
  const [selectedRole, setRole] = useState<string>('');

  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
      apiClient.register(values).then((response) => {
        console.log('values: ', values);
        console.log('response: ', response);
        if (response.success) {
          alert(
            'Account created succesfully! Role: ' +
              response.data?.role +
              ' Email: ' +
              response.data?.email +
              ' ID: ' +
              response.data?.userId,
          );
          navigate('/homeadm');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required("Email can't be empty"),
        password: yup
          .string()
          .required("Password can't be empty")
          .min(5, 'Password must be at least 5 characters long'),
        firstName: yup.string().required("First name can't be empty"),
        lastName: yup.string().required("Last name can't be empty"),
        role: yup
          .mixed()
          .oneOf(['ROLE_READER', 'ROLE_ADMIN'])
          .required("Role can't be empty"),
      }),
    [],
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 2 }}>
        <Formik
          initialValues={{
            password: '',
            role: '',
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={submit}
          validationSchema={validationSchema}
          validateOnBlur
          validateOnChange
        >
          {(formik: FormikProps<FormValues>) => (
            <Form
              id="RegisterForm"
              className="Register-form"
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
                    id="email"
                    label="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    id="firstName"
                    label="firstName"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName && !!formik.errors.firstName
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                  <TextField
                    id="lastName"
                    label="lastName"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                  <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    marginLeft: 5,
                  }}
                >
                  <Typography fontSize={22}>Select role</Typography>
                  <Button
                    key="ROLE_READER"
                    variant={
                      selectedRole === 'ROLE_READER' ? 'contained' : 'outlined'
                    }
                    sx={{
                      margin: 1,
                      width: 200,
                      height: 60,
                    }}
                    onClick={() => {
                      if (selectedRole === 'ROLE_READER') {
                        setRole('');
                        formik.setFieldValue('role', '');
                      } else {
                        setRole('ROLE_READER');
                        formik.setFieldValue('role', 'ROLE_READER');
                      }
                    }}
                  >
                    <Typography fontSize={24}>ROLE_READER</Typography>
                  </Button>
                  <Button
                    key="ROLE_ADMIN"
                    variant={
                      selectedRole === 'ROLE_ADMIN' ? 'contained' : 'outlined'
                    }
                    sx={{
                      margin: 1,
                      width: 200,
                      height: 60,
                    }}
                    onClick={() => {
                      if (selectedRole === 'ROLE_ADMIN') {
                        setRole('');
                        formik.setFieldValue('role', '');
                      } else {
                        setRole('ROLE_ADMIN');
                        formik.setFieldValue('role', 'ROLE_ADMIN');
                      }
                    }}
                  >
                    <Typography fontSize={24}>ROLE_ADMIN</Typography>
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginTop: 5,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<HowToRegIcon style={{ fontSize: 30 }} />}
                  sx={{ width: 200, height: 60 }}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  form="RegisterForm"
                >
                  <Typography fontSize={24}>Register</Typography>
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
