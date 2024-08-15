import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; // Import the CSS file for styling the impo
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Make a request to the backend to verify the credentials
    // You can use fetch or any other HTTP client library
    axios.post('http://localhost:4000/api/login', values).then((response) => {
      console.log(response.data);
      resetForm(); // Reset the form after submission


    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the response from the backend
    //     if (data.success) {
    //       // Redirect to the dashboard or any other page
    //       // You can use React Router to navigate to a different page
    //       // For example: history.push('/dashboard');
    //     } else {
    //       // Handle login failure
    //       // You can display an error message to the user
    //       console.error('Login failed:', data.message);
    //     }
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
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error-message" />
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

export default LoginPage;