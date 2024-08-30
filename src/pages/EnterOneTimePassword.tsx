import React from 'react';
import { Form, Navigate } from 'react-router-dom';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

type FormValues = {
  oneTimePassword: string;
};

const LoginSchema = Yup.object().shape({
  oneTimePassword: Yup.string().required('One Time Password is required'),
});

const initialValues = {
  oneTimePassword: '',
};

const handleLogin = async (values: FormValues, { setSubmitting, resetForm }: any) => {
  setSubmitting(true);
  try {
    const response = await axios.post('http://localhost:4000/api/login', values);
    console.log(response.data);
    // Update the form with the generated code
    // setLoginCode(response.data);
    Navigate('/home');
  } catch (error) {
    console.error(error);
  }
};

const EnterOneTimePassword = () => {
  return (
    <div>
      <h2>Enter One Time Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="oneTimePassword">One Time Password</label>
            <Field type="text" id="oneTimePassword" name="oneTimePassword" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EnterOneTimePassword;