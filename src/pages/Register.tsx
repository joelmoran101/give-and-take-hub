import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  giver: boolean;
  searcher: boolean;
};  

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string(),
  giver: Yup.boolean(),
  searcher: Yup.boolean(),
});

const Register = () => {
const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  giver: false,
  searcher: false,
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
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
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

          <div className="form-group">
            <label>
              <Field type="checkbox" id="giver" name="giver" />
              Giver
            </label>
            <ErrorMessage name="giver" component="div" />
          </div>

          <div className="form-group">
            <label>
              <Field type="checkbox" id="searcher" name="searcher" />
              Searcher
            </label>
            <ErrorMessage name="searcher" component="div" />
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">Register</button>
            <button type="button" className="edit-button">Edit</button>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Register;
