import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; // Import the CSS file for styling the impo
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('username_or_email is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email'),
});

const Login = () => {
  const initialValues = {
    username_or_email: '',
    password: '',
    email: '',
  }
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
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
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{
          username_or_email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username_or_email">Username or Email</label>
            <Field type="text" id="username_or_email" name="username_or_email" />
            <ErrorMessage name="username_or_email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <button type="submit" className="login-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;