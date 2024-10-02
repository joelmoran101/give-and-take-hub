import React, { useContext, useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import './UserProfile.sass'

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

const deleteAccountValidationSchema = Yup.object().shape({
  confirmDelete: Yup.boolean()
    .oneOf([true], 'You must confirm to delete your account')
    .required('You must confirm to delete your account'),
})

const UserProfile: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  const handleProfileUpdate = async (values: UserProfile, { setSubmitting }: any) => {
    try {
      const response: any = await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/edit-user-profile`, values)
      if (setLoggedInUser) {
        setLoggedInUser(response.data)
      }
      setIsEditing(false)
      setError(null)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAccount = async (values: { confirmDelete: boolean }, { setSubmitting }: any) => {
    if (!values.confirmDelete) {
      setError('You must confirm to delete your account')
      setSubmitting(false)
      return
    }
  
    try {
      const hostname = window.location.hostname
      const url = `${import.meta.env.VITE_BACKEND_HOST}/delete-account`
      await axios.delete(url)
      setLoggedInUser(null)
      navigate('/')
    } catch (error) {
      console.error('Error deleting account:', error)
      setError('Failed to delete account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!loggedInUser) {
    return <div className="user-profile-container">Loading...</div>
  }

  return (
    <div className="user-profile-container">
      <h1>{isEditing ? 'Edit Profile' : isDeleting ? 'Delete Account' : 'User Profile'}</h1>
      {error && <div className="error">{error}</div>}
      {!isDeleting ? (
        <Formik
          initialValues={loggedInUser || defaultUser}
          validationSchema={validationSchema}
          onSubmit={handleProfileUpdate}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="profile-picture">
                <img src={loggedInUser.profilePic || defaultUser.profilePic} alt={`${loggedInUser.firstname} ${loggedInUser.lastname}`} />
              </div>
              {['firstname', 'lastname', 'username', 'email', 'phone'].map((field) => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <Field type={field === 'email' ? 'email' : 'text'} id={field} name={field} disabled={!isEditing} />
                  <ErrorMessage name={field} component="div" className="error" />
                </div>
              ))}
              <div className="button-container">
                {isEditing ? (
                  <>
                    <button type="submit" className="save-button" disabled={isSubmitting}>
                      Save Changes
                    </button>
                    <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                    <button type="button" className="delete-button" onClick={() => setIsDeleting(true)}>
                      Delete Account
                    </button>
                  </>
                )}
                <Link to="/" className="back-button">Back to Home Page...</Link>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ confirmDelete: false }}
          validationSchema={deleteAccountValidationSchema}
          onSubmit={handleDeleteAccount}
        >
          {({ isSubmitting }) => (
            <Form>
              <p className="warning-message">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="form-group">
                <label>
                  <Field type="checkbox" name="confirmDelete" />
                  I understand that this action is irreversible and I want to delete my account
                </label>
                <ErrorMessage name="confirmDelete" component="div" className="error" />
              </div>
              <div className="button-container">
                <button type="submit" className="delete-button" disabled={isSubmitting}>
                  Confirm Delete Account
                </button>
                <button type="button" className="cancel-button" onClick={() => setIsDeleting(false)}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default UserProfile