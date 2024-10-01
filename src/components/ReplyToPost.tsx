import React, { useState, useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface Article {
  _id: string;
  article_name: string;
  picture_url: string;
  article_category: string;
  article_description: string;
  username: string;
  date_time_stamp: string;
  status: string;
  location: string;
}

const ReplyToPostSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
});

const ReplyToPost: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const location = useLocation();
  const [sent, setSent] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (location.state && location.state.article) {
      setArticle(location.state.article);
    } else {
      // Fetch article data if not provided in location state
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/articles/${articleId}`);
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!article) return;

    try {
      const response = await axios.post(`http://localhost:4000/api/send-message/${article._id}`, {
        sender: loggedInUser.username,
        recipient: article.username,
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

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reply-to-post-container">
      <h2>Reply to {article.username}</h2>
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