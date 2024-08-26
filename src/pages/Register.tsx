import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
};  

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
});

const Register = () => {
const initialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phone: ''

}
const navigate = useNavigate();

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    axios.post('http://localhost:4000/api/register', values).then((response) => {
      console.log(response.data);
      resetForm(); // Reset the form after submission
      navigate('/login');

    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="register-container">
      <h1>Registration Form</h1>
      <Formik

        initialValues={initialValues}

        validationSchema={RegisterSchema}

        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <Field type="text" id="firstname" name="firstname" />
            <ErrorMessage name="firstname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <Field type="text" id="lastname" name="lastname" />
            <ErrorMessage name="lastname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">Register</button>
            <Link to="/" className="back-button">Go back...</Link>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Register;
