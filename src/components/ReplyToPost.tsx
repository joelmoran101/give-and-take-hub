import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Article, ArticleContext } from '../context/article.context';

type FormValues = {
  message: string;
};  

const ReplyToPostSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
});

const ReplyToPost: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { articles, getArticle } = useContext(ArticleContext);
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const location = useLocation();
  const [sent, setSent] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  const currentArticle = useMemo(() => {
    if (!articles || !articleId) return null;
    return getArticle(articleId);
  }, [articles, articleId]);

  useEffect(() => {
    if (location.state && location.state.article) {
      setArticle(location.state.article);
    } else {
      // Fetch article data if not provided in location state
      const fetchArticle = async () => {
        try {
          const response: any = await axios.get(`http://localhost:4000/api/articles/${articleId}`);
          setArticle(response.data);
        } catch (error) {
          console.error('Error fetching article:', error);
          navigate('/browse');
        }
      };
      fetchArticle();
    }
  }, [articleId, location.state, navigate]);



  const initialValues = {
    message: '',
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    if (!loggedInUser || !article) return;

    try {
      const response = await axios.post(`http://localhost:4000/api/send-message/${article._id}`, {
        sender: loggedInUser.userId,
        recipient: article.userId,
        message: values.message,
      });
      console.log('Message sent successfully:', response.data);
      setSent(true);
      resetForm();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSubmitting(false);
    }
  };

if (!currentArticle) return <h4>Loading...</h4>
  

  return (
    <div className="reply-to-post-container">
      <h2>Reply to {currentArticle.username}</h2>
      {/* { JSON.stringify(currentArticle) } */}
      <Formik
        initialValues={initialValues}
        validationSchema={ReplyToPostSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field
                as="textarea"
                name="message"
                placeholder="Type your message here..."
                className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="message" component="div" className="invalid-feedback" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Send Message
            </button>
            {sent && (
              <p>Message sent successfully!</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReplyToPost;