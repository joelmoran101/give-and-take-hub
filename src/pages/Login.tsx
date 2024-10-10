import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup'; 
import './Login.css'; 
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../state/userSlice';
import { BACKEND_HOST } from '../config/config';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type FormValues = {
  username_or_email: string;
};

const LoginSchema = Yup.object().shape({
  username_or_email: Yup.string().required('Username or email is required'),
});

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username_or_email: '',
  };

  const handleRequestPassword = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    setSubmitting(true);
    try {
      const response = await axios.post<{userId: string, message: string, success: boolean}>(
        `${BACKEND_HOST}/api/request-password`, 
        { username_or_email: values.username_or_email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Server response:', response.data);

      if (response.data.success) {
        dispatch(setUserId(response.data.userId));
        navigate('/enter-one-time-password');
      } else {
        setModalMessage(response.data.message || 'Failed to request password. Please try again.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error details:', error);
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          setModalMessage('Invalid username or email. Please check your credentials or register if you don\'t have an account yet.');
        } else {
          setModalMessage(error.response?.data?.message || 'An unexpected error occurred. Please try again later.');
        }
      } else {
        setModalMessage('An unexpected error occurred. Please try again later.');
      }
      setShowModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleRequestPassword}
      >
        {({ isSubmitting }) => (
          <Form role='form'>
            <div className="form-group">
              <label htmlFor="username_or_email">Enter Username or Email</label>
              <Field type="text" id="username_or_email" name="username_or_email" placeholder="Username or Email"/>
              <ErrorMessage name="username_or_email" component="div" className="error-message" />
            </div>
            <button type="submit" className="get_code_button" disabled={isSubmitting}>
              {isSubmitting ? 'Requesting...' : 'Request Password'}
            </button>
            <div className="form-group">
              <Link to="/register">No account yet? Register here...</Link>
            </div>
          </Form>
        )}
      </Formik>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;