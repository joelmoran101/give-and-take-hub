import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddArticle.css';
import { AuthContext } from '../../auth/AuthContext';

interface ArticleCardProps {
  article: {
    article_name: string;
    picture_url: string;
    article_category: string;
    article_description: string;
    date_time_stamp: string;
    status: string;
    location: string;
  };
}

const AddArticleSchema = Yup.object().shape({
  article_name: Yup.string().required('Article Name is required'),
  picture_url: Yup.string(),
  article_category: Yup.string().required('Category is required'),
  article_description: Yup.string().required('Description is required'),
  date_time_stamp: Yup.string().required('Date and Time is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
});

const AddArticle: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const navigate = useNavigate();

  const initialValues: ArticleCardProps['article'] = {
    article_name: '',
    picture_url: '',
    article_category: '',
    article_description: '',
    date_time_stamp: '',
    status: '',
    location: '',
  };

  const handleSubmit = async (values: ArticleCardProps['article'], { setSubmitting, resetForm }: FormikHelpers<ArticleCardProps['article']>) => {
    try {
      const response = await axios.post('http://localhost:4000/api/add-article', values);
      console.log('Article added successfully:', response.data);
      resetForm();
      navigate('/browse'); // Redirect to the browse page after successful submission
    } catch (error) {
      console.error('Error adding article:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='add-article'>
      <h2>Add an Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={AddArticleSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form>
            <div className='form-group'>
              <Field name="article_name" placeholder="Article Name" />
              <ErrorMessage name="article_name" component="div" className="error" />
            </div>

            <div className='form-group'>
              <Field name="picture_url" disabled placeholder="Upload Picture/s" />
              <input
              type="file"
              name="picture_url"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
            )}
              <ErrorMessage name="picture_url" component="div" className="error" />
            </div>

            <div className='form-group'>
              <Field name="article_category" placeholder="Category" />
              <ErrorMessage name="article_category" component="div" className="error" />
            </div>
            <div className='form-group'>
              <Field name="article_description" as="textarea" placeholder="Description" />
              <ErrorMessage name="article_description" component="div" className="error" />
            </div>
            <div className='form-group'>
              <Field name="date_time_stamp" type="datetime-local" />
              <ErrorMessage name="date_time_stamp" component="div" className="error" />
            </div>
            <div className='form-group'>
              <Field name="status" as="select">
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="taken">Taken</option>
                <option value="needed">Needed</option>
              </Field>
              <ErrorMessage name="status" component="div" className="error" />
            </div>
            <div className='form-group'>
              <Field name="location" placeholder="Location" />
              <ErrorMessage name="location" component="div" className="error" />
            </div>

            <div className="button-container">
              <button className='submit-button' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <Link to="/browse" className="back-button">Go back to browsing</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddArticle;