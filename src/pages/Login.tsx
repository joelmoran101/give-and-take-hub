import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
type FormValues = {
  username_or_email: string;
};

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('username_or_email is required'),
});
const Login: React.FC = () => {
  const [loginCode, setLoginCode] = useState<string>(''); // Move the state hook here
  const navigate = useNavigate();

  const initialValues = {
    username_or_email: '',
  };

const handleRequestPassword = async (values: FormValues, { setSubmitting, resetForm }:FormikHelpers<FormValues>) => {
  setSubmitting(true);
  try {
    const response = await axios.post('http://localhost:4000/api/request-password', { username_or_email: values.username_or_email });
    console.log(response.data);
    // Update the form with the generated code
    // setLoginCode(response.data);
    navigate('/enter-one-time-password' );
  } catch (error) {
    alert('Error:'+ error);
  }
  finally {
    setSubmitting(false);
  }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleRequestPassword}
      >
      {(formik) => (
            <Form role='form'>
            <div className="form-group">
              <label htmlFor="username_or_email">Enter Username or Email</label>
              <Field type="text" id="username_or_email" name="username_or_email" placeholder="Username or Email"/>
              <ErrorMessage name="username_or_email" component="div" className="error-message" />
            </div>
            <button type="submit" className="get_code_button" >Request Password</button>
            <div className="form-group">
              <label htmlFor="loginCode"></label>
              
              <ErrorMessage name="loginCode" component="div" className="error-message" />
            </div>
            
            <Link to="/register">No account yet? Register here...</Link>
            
          </Form>
      )}
      </Formik>
    </div>
  );
};

export default Login;