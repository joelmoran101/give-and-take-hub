import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';
import { useSelector } from 'react-redux';
import { BACKEND_HOST } from '../config/config';

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
  const navigate = useNavigate();
  const initialValues = {
    oneTimePassword: '',
  };
  const handleLogin = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    try {
      const response = await axios.post(BACKEND_HOST+'/api/login', { 
        userId,
        oneTimePassword: values.oneTimePassword.toUpperCase(), 
      });
      console.log(response.data);
      // Update the form with the generated code
      // setLoginCode(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Enter One Time Password</h2>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EnterOneTimePassword;