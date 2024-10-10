import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddArticle.css';
import { AuthContext } from '../../auth/AuthContext';
import { Article, ArticleContext } from '../../context/article.context';

interface ArticleCardProps {
  article: {
    article_name: string;
    photos: string[];
    article_category: string;
    article_description: string;
    date_time_stamp: string;
    status: string;
    location: string;
  };
}

const AddArticleSchema = Yup.object().shape({
  article_name: Yup.string().required('Article Name is required'),
  article_category: Yup.string().required('Category is required'),
  article_description: Yup.string().required('Description is required'),
  date_time_stamp: Yup.string().required('Date and Time is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
});

const AddArticle: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { addArticle } = useContext(ArticleContext);
  const [selectedFiles, setSelectedFiles] = useState<File [] | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const files= Array.from(event.target.files);
    setFieldValue('photos', files); // Update the 'photos' field
    // setSelectedFile(event.target.files[0]);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };


  const navigate = useNavigate();

  const initialValues: ArticleCardProps['article'] = {
    article_name: '',
    photos: [],
    article_category: '',
    article_description: '',
    date_time_stamp: getCurrentDateTime(),
    status: '',
    location: '',
  };

  const handleSubmit = async (values: ArticleCardProps['article'], { setSubmitting, resetForm }: FormikHelpers<ArticleCardProps['article']>) => {
    try {
     await addArticle(values as Article, selectedFiles  );
      resetForm();
      navigate('/browse'); // Redirect to the browse page after successful submission
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Error adding article: ' + error);
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
              <Field name="photos" disabled placeholder="Upload Picture/s" />
              <input
              type="file"
              name="photos"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            {selectedFiles && (
              <img src={URL.createObjectURL(selectedFiles)} alt="Selected Image" />
            )}
              <ErrorMessage name="photos" component="div" className="error" />
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
              <Field name="date_time_stamp" type="datetime-local" placeholder="Date and Time" value={values.date_time_stamp} onChange={(e) => setFieldValue('date_time_stamp', e.target.value)} />
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