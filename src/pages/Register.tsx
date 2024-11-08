import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import axios from 'axios';
// import Login from './Login';
import Terms from './Terms/terms';
import { Link, useNavigate } from 'react-router-dom';
import { t } from 'i18next';

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

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    
    try { 
      const response = await axios.post(import.meta.env.VITE_BACKEND_HOST +'/register', values)
      console.log(response.data);
      resetForm(); // Reset the form after submission
      alert('Registration successful');
      navigate('/login');

    } catch (error: any) {
      alert(error.response.data || error.message || error.response.data.message || 'Registration failed');

      console.error(error);
    }

  };

  return (
    <div className="register-container">
      <h1>{t('Registration Form')}</h1>
      <Formik

        initialValues={initialValues}

        validationSchema={RegisterSchema}

        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstname">{t('Firstname')}</label>
            <Field type="text" id="firstname" name="firstname" />
            <ErrorMessage name="firstname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">{t('Lastname')}</label>
            <Field type="text" id="lastname" name="lastname" />
            <ErrorMessage name="lastname" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="username">{t('choose a username')}</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('Email')}</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t('Phone')}</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>
          {/* place terms and conditions here */}
          <div className="terms">
            <span>{t('By registering')}</span>
            <Link to="/terms-and-conditions">{t('Terms and Conditions')}</Link>
          </div>
          
          <div className="button-container">

            <button type="submit" className="register-button">{t('Register')}</button>
            <Link to="/" className="back-button">{t('Go back')}</Link>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Register;
