import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import './ViewProfile.sass'
import { AuthContext } from '../auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

interface UserProfile {
  userId: string
  firstname: string
  lastname: string
  username: string
  email: string
  profilePic: string
  phone: string
}

const defaultUser: UserProfile = {
  userId: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  profilePic: '/placeholder.svg?height=100&width=100',
  phone: ''
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
})

const ViewProfile: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  const handleSubmit = async (values: UserProfile, { setSubmitting }: FormikHelpers<UserProfile>) => {
    try {
      const response = await axios.put(`/api/users/${values.userId}`, values)
      if (setLoggedInUser) {
        setLoggedInUser(response.data)
      }
      setIsEditing(false)
      setError(null)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile. Please try again.')
    }
    setSubmitting(false)
  }

  if (!loggedInUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="view-profile">
      <h1>User Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <Formik
        initialValues={loggedInUser || defaultUser}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="profile-picture">
              <img src={values.profilePic} alt={`${values.firstname} ${values.lastname}`} />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <Field type="text" id="firstname" name="firstname" disabled={!isEditing} />
              <ErrorMessage name="firstname" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <Field type="text" id="lastname" name="lastname" disabled={!isEditing} />
              <ErrorMessage name="lastname" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" disabled={!isEditing} />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" disabled={!isEditing} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Field type="tel" id="phone" name="phone" disabled={!isEditing} />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            {isEditing ? (
              <div className="button-group">
                <button type="submit" disabled={isSubmitting}>
                  Save Changes
                </button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </Form>
        )}
      </Formik>
      <div className="delete-account">
        <Link to="/delete-account">Delete Account</Link>
      </div>
    </div>
  )
}

export default ViewProfile