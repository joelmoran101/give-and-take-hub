import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import './ViewProfile.sass'
import './DeleteAccount'
import { AuthContext } from '../auth/AuthContext'
import { Link } from 'react-router-dom'

const ViewProfileSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  username: Yup.string(),
  email: Yup.string().email(),
  phone: Yup.string(),
});

const ViewProfile = () => {
  const { loggedInUser } = useContext(AuthContext)

  const handleUpdateProfile = async (values) => {
    try {
      await axios.put(`${BACKEND_HOST}/users/${user.id}`, values);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
function Profile() {
  return (
    <div>
      <h2>View Profile</h2>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          phone: '',  
        }}
        validationSchema={ViewProfileSchema}
        onSubmit={handleUpdateProfile}
      >

{({ isSubmitting }) => (
          <Form>
            <div>
              <label>Firstname:</label>
              <Field type="text" name="firstname" />
              <ErrorMessage name="firstname" component="div" />
            </div>
            <div>
              <label>Lastname:</label>
              <Field type="text" name="lastname" />
              <ErrorMessage name="lastname" component="div" />
            </div>
            <div>
              <label>Username:</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Phone:</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ViewProfile
