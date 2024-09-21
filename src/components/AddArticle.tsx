import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddArticle.css';

interface ArticleCardProps {
  article: {
    _id: string;
    article_name: string;
    picture_url: string;
    article_category: string;
    article_description: string;
    username: string;
    date_time_stamp: string;
    status: string;
    location: string;
  };
}

const AddArticleSchema = Yup.object().shape({
  article_name: Yup.string().required('Article Name is required'),
  picture_url: Yup.string().required('Picture URL is required'),
  article_category: Yup.string().required('Category is required'),
  article_description: Yup.string().required('Description is required'),
  username: Yup.string().required('Username is required'),
  date_time_stamp: Yup.string().required('Date and Time is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
});

const AddArticle: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: ArticleCardProps['article'] = {
    _id: '', // You might want to remove this if it's generated on the server
    article_name: '',
    picture_url: '',
    article_category: '',
    article_description: '',
    username: '',
    date_time_stamp: '',
    status: '',
    location: '',
  };

  const handleSubmit = (values: ArticleCardProps['article'], { resetForm }: FormikHelpers<ArticleCardProps['article']>) => {
    axios.post('http://localhost:4000/api/add-article', values)
      .then((response) => {
        console.log(response.data);
        resetForm();
        navigate('/browse');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='add-article'>
      <h2>Add an Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={AddArticleSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='form-group'>
              <Field name="article_name" placeholder="Article Name" />
              <ErrorMessage name="article_name" component="div" />
            </div>
            <div className='form-group'>
              <Field name="picture_url" placeholder="Picture URL" />
              <ErrorMessage name="picture_url" component="div" />
            </div>
            <div className='form-group'>
              <Field name="article_category" placeholder="Category" />
              <ErrorMessage name="article_category" component="div" />
            </div>
            <div className='form-group'>
              <Field name="article_description" as="textarea" placeholder="Description" />
              <ErrorMessage name="article_description" component="div" />
            </div>
            <div className='form-group'>
              <Field name="username" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div className='form-group'>
              <Field name="date_time_stamp" type="datetime-local" />
              <ErrorMessage name="date_time_stamp" component="div" />
            </div>
            <div className='form-group'>
              <Field name="status" as="select">
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="taken">Taken</option>
                <option value="needed">Needed</option>
              </Field>
              <ErrorMessage name="status" component="div" />
            </div>
            <div className='form-group'>
              <Field name="location" placeholder="Location" />
              <ErrorMessage name="location" component="div" />
            </div>

            <div className="button-container">
              <button className='submit-button' type="submit">Submit</button>
              <Link to="/browse" className="back-button">Go back to browsing</Link>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddArticle;