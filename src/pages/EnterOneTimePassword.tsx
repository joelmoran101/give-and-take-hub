import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';
import { useSelector } from 'react-redux';
import { BACKEND_HOST } from '../config/config';
import { AuthContext } from '../auth/AuthContext';

type FormValues = {
  oneTimePassword: string;
};

const LoginSchema = Yup.object().shape({
  oneTimePassword: Yup.string()
    .required('One Time Password is required')
    .transform((value) => value.toUpperCase()),
});


const EnterOneTimePassword = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const { setLoggedInUser } = useContext(AuthContext)
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    oneTimePassword: '',
  };
  const handleLogin = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    try {
      // response any has to be changed later
      const response:any = await axios.post(BACKEND_HOST+'/api/login', { 
        userId,
        oneTimePassword: values.oneTimePassword.toUpperCase(), 
      });
      console.log(response.data);

      localStorage.setItem('access_token', response.data.token); // Store token in local storage

      setLoggedInUser(response.data.user);
      // Update the form with the generated code
      // setLoginCode(response.data);
      navigate('/');
    } catch (error) {
      setError(error.response.data.message || error.message || 'An error occurred. Please try again.');
      console.error(error);
    }
    finally {
      setSubmitting(false);
  };
}
  return (
    <div className="login-container">
      <h2>Enter One Time Password</h2>
      {error && <p className="text-danger">{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className='login-form'>
            <label htmlFor="oneTimePassword" padding-right="1em">Check your email for One Time Password</label>
            
            <Field type="text" border-radius="10px" id="oneTimePassword" name="oneTimePassword" placeholder="Enter 1-Time Password"/>
            <button className='login-button' type="submit" disabled={isSubmitting}>
              Login
            </button>
            <Link className='request_new_otp d-block mt-4'  to="/login">Request for a new One Time Password...</Link>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default EnterOneTimePassword