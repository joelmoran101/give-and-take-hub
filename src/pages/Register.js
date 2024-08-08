import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string(),
  giver: Yup.boolean(),
  searcher: Yup.boolean(),
});

const Register = () => {
  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          phone: '',
          giver: false,
          searcher: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div>
            <label>
              <Field type="checkbox" id="giver" name="giver" />
              Giver
            </label>
            <ErrorMessage name="giver" component="div" />
          </div>

          <div>
            <label>
              <Field type="checkbox" id="searcher" name="searcher" />
              Searcher
            </label>
            <ErrorMessage name="searcher" component="div" />
          </div>

          <button type="submit">Submit</button>
          <button type="button">Edit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
