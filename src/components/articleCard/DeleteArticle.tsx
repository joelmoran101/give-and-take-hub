import React, { useContext, useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Card, Alert } from 'react-bootstrap';
import './DeleteArticle.scss'
import { ArticleContext } from '../../context/article.context';

const validationSchema = Yup.object().shape({
  confirmDelete: Yup.boolean()
    .oneOf([true], 'You must confirm to delete this article from your posts')
    .required('You must confirm to delete this article from your posts'),
})

interface ArticleData {
  _id: string;
  article_name: string;
  article_description: string;
  article_category: string;
  status: string;
  location: string;
}

const DeleteArticle: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext)
  const { getArticle, deleteArticle } = useContext(ArticleContext)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  const { articleId } = useParams<{ articleId: string }>()
  const location = useLocation()
  const [article, setArticle] = useState<ArticleData | null>(null)

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
      return
    }

    if (location.state && (location.state as any).article) {
      setArticle((location.state as any).article)
    } else {
      // Fetch article data if not provided in location state
      const fetchArticle = async () => {
        try {
          const article= getArticle(articleId)
          setArticle(article)
        } catch (err) {
          setError('Failed to fetch article data')
        }
      }
      fetchArticle()
    }
  }, [loggedInUser, navigate, articleId, location.state])

  const handleSubmit = async (values: { confirmDelete: boolean }) => {
    if (values.confirmDelete) {
      try {
        await deleteArticle(articleId || '')
        setSuccess('Article deleted successfully')
        setTimeout(() => navigate('/browse'), 2000)
      } catch (err) {
        setError('Failed to delete article')
        console.error('Delete article error:', err) 
      }
    }
  }

  if (!article) {
    return <div>Loading...</div>
  }

  return (
    <div className="delete-article-container">
      <h2>Delete Article</h2>
      <Card>
        <Card.Body>
          <Card.Title>{article.article_name}</Card.Title>
          <Card.Text>{article.article_description}</Card.Text>
          <Card.Text>Category: {article.article_category}</Card.Text>
          <Card.Text>Status: {article.status}</Card.Text>
          <Card.Text>Location: {article.location}</Card.Text>
        </Card.Body>
      </Card>
      <Formik
        initialValues={{ confirmDelete: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>
                <Field type="checkbox" name="confirmDelete" />
                I confirm that I want to delete this article
              </label>
              <ErrorMessage name="confirmDelete" component="div" className="error" />
            </div>
            <div className="button-container">
              <Button type="submit" variant="danger" disabled={isSubmitting} className="action-button delete-button">
                {isSubmitting ? 'Deleting...' : 'Delete Article'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/browse')} 
                className="action-button cancel-button"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

    </div>
  )
}

export default DeleteArticle