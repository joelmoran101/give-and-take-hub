import React, { useContext, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteArticle.sass'

const validationSchema = Yup.object().shape({
    confirmDelete: Yup.boolean()
        .oneOf([true], 'You must confirm to delete this article from your posts')
        .required('You must confirm to delete this article from your posts'),
})

const DeleteArticle: React.FC = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
  
    if (!loggedInUser) {
      navigate('/login')
      return null
    }

function DeleteArticle() {
  return (
    <div>
      
    </div>
  )
}
}
export default DeleteArticle
