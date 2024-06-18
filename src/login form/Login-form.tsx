import { Button, TextField } from '@mui/material';
import './Login-form.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../ApiProvider';

type FormValues = {
  username: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const submit = useCallback(
    (values: FormValues, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      });
    },
    [apiClient, navigate],
  );

  //validation Schema is immutable, will only change if we change validation rules, otherwise immutable
  const validationSchema = useMemo(
    () =>
      yup.object({
        //useMemo hook
        username: yup.string().required("Username can't be empty"),
        password: yup
          .string()
          .required("Password can't be empty")
          .min(5, 'Password must be at least 5 characters long'),
      }),
    [],
  );

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={submit}
      validationSchema={validationSchema}
      validateOnBlur
      //validates after you diselect
      validateOnChange
    >
      {(formik: any) => (
        <form
          id="LoginForm"
          className="Login-form"
          onSubmit={formik.handleSubmit}
          noValidate //always set noValidate on validate form
        >
          <TextField
            id="username"
            label="username"
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleChange}
            error={formik.touched.username && !!formik.errors.username}
            // !!" " of empty string gives false (returns Boolean) same as !Boolean(" ")
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="password"
            variant="standard"
            type="password"
            onChange={formik.handleChange}
          />
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Sign in
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
