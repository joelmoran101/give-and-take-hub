import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; // Import the CSS file for styling the impo
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  username_or_email: string;
};

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('username_or_email is required'),
});

const Login = () => {
  const initialValues = {
    username_or_email: '',
  }

  const navigate = useNavigate();
  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }:FormikHelpers<FormValues>) => {
    // Make a request to the backend to verify the credentials
    // You can use fetch or any other HTTP client library
    axios.post('http://localhost:4000/api/login', values)
    
    .then((response) => {
      console.log(response.data);
      resetForm(); // Reset the form after submission
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setSubmitting(false);
        navigate('/home');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username_or_email">Username or Email</label>
            <Field type="text" id="username_or_email" name="username_or_email" />
            <ErrorMessage name="username_or_email" component="div" className="error-message" />
          </div>
          <Link to="/register">No account yet? Register here...</Link>
          <button type="submit" className="login-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;