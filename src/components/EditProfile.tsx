// src/components/EditProfile.tsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfileSchema = Yup.object().shape({
  firstname: Yup.string(),
  lastname: Yup.string(),
  username: Yup.string(),
  email: Yup.string().email(),
  phone: Yup.string(),
});

const EditProfile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_HOST}/users/${loggedInUser.id}`, values);
      setLoggedInUser(response.data.user);
      navigate('/view-profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <Formik
        initialValues={{
          firstname: loggedInUser.firstname,
          lastname: loggedInUser.lastname,
          username: loggedInUser.username,
          email: loggedInUser.email,
          phone: loggedInUser.phone,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={handleUpdateProfile}
      >
        {({ isSubmitting, handleChange, handleSubmit }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <Field type="text" id="firstname" name="firstname" onChange={handleChange} />
              <ErrorMessage name="firstname" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <Field type="text" id="lastname" name="lastname" onChange={handleChange} />
              <ErrorMessage name="lastname" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" onChange={handleChange} />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" onChange={handleChange} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field type="text" id="phone" name="phone" onChange={handleChange} />
              <ErrorMessage name="phone" component="div" className="error" />
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

export default EditProfile;