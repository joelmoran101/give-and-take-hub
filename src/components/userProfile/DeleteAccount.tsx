import React, { useContext, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import './DeleteAccount.sass'

const validationSchema = Yup.object().shape({
  confirmDelete: Yup.boolean()
    .oneOf([true], 'You must confirm to delete your account')
    .required('You must confirm to delete your account'),
})

const DeleteAccount: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  if (!loggedInUser) {
    navigate('/login')
    return null
  }

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/delete-account/${loggedInUser.userId}`)
      setLoggedInUser(null)
      navigate('/')
    } catch (error) {
      console.error('Error deleting account:', error)
      setError('Failed to delete account. Please try again.')
    }
  }

  return (
    <div className="delete-account-container">
      <h1>Delete Account</h1>
      <p className="warning-message">Are you sure you want to delete your account? This action cannot be undone.</p>
      <Formik
        initialValues={{ confirmDelete: false }}
        validationSchema={validationSchema}
        onSubmit={handleDeleteAccount}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>
                <input type="checkbox" name="confirmDelete" />
                I understand that this action is irreversible and I want to delete my account
              </label>
              {errors.confirmDelete && touched.confirmDelete && (
                <div className="error-message">{errors.confirmDelete}</div>
              )}
            </div>
            <div className="button-container">
              <button type="submit" className="delete-button" disabled={isSubmitting}>
                Delete Account
              </button>
              <button type="button" className="cancel-button" onClick={() => navigate('/profile')}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default DeleteAccount