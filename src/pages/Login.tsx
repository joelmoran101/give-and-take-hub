import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
type FormValues = {
  username_or_email: string;
  loginCode: string;
};

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('username_or_email is required'),
});

const Login = () => {
  const initialValues = {
    username_or_email: '',
    loginCode: '', // new input field for one-time login code
  }

const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }:FormikHelpers<FormValues>) => {
 
// Generate a random one-time login code
const code = Math.floor(100000 + Math.random() * 900000).toString();

// Send the code to the user's email

 // Store the code in a session or database for later verification
  // ...

  setSubmitting(false);
  navigate('/verify-code');
};

	//   setLoading(true);
//     // Make a request to the backend to verify the credentials
//     // You can use fetch or any other HTTP client library
// 	try {
// 		const response = await axios.post('http://localhost:4000/api/login-with-code', values);
// 				console.log(response.data);
// 				resetForm(); // Reset the form after submission
// 				navigate('/home');
// 	} catch (error) {
//   			console.error('Error:', error);
// 	} finally {
//   			setLoading(false);
//   			setSubmitting(false);
// 	}
// };

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
          <button type="submit" className="get_code_button">Get One-Time Login Code</button>
          <div className="form-group">
            <label htmlFor="loginCode"></label>
            <Field type="text" id="loginCode" name="loginCode" placeholder="One-Time Login Code"/>
            <ErrorMessage name="loginCode" component="div" className="error-message" />
          </div>
          
          <Link to="/register">No account yet? Register here...</Link>
          <button type="submit" className="login-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;