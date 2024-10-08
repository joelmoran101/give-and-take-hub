import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditArticle.scss';
import { AuthContext } from '../../auth/AuthContext';
import { ArticleContext } from '../../context/article.context';

interface ArticleFormValues {
  _id: string;
  article_name: string;
  photos: string[];
  article_category: string;
  article_description: string;
  username: string;
  date_time_stamp: string;
  status: string;
  location: string;
}

const EditArticleSchema = Yup.object().shape({
  article_name: Yup.string().required('Article Name is required'),
  article_category: Yup.string().required('Category is required'),
  article_description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
});

const EditArticle: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { getArticle } = useContext(ArticleContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (articleId) {
        try {
          const article = await getArticle(articleId);
          setInitialValues(article);
        } catch (error) {
          console.error('Error fetching article:', error);
          navigate('/browse');
        }
      }
    };
    fetchArticle();
  }, [articleId, getArticle, navigate]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    setFieldValue('photos', files);
  };

  const handleSubmit = async (values: ArticleFormValues, { setSubmitting }: FormikHelpers<ArticleFormValues>) => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
  
      formData.append('article_name', values.article_name);
      formData.append('article_category', values.article_category);
      formData.append('article_description', values.article_description);
      formData.append('status', values.status);
      formData.append('location', values.location);
  
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/api/edit-article/${articleId}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      
      console.log('Article updated successfully:', response.data);
      navigate('/browse');
    } catch (error) {
      console.error('Error updating article:', error);
      // You might want to add some user feedback here
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className='edit-article'>
      <h2>Edit Article</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={EditArticleSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='form-group'>
              <Field name="article_name" placeholder="Article Name" />
              <ErrorMessage name="article_name" component="div" className="error" />
            </div>

            <div className='form-group'>
              <input
                type="file"
                name="photos"
                accept="image/*"
                onChange={(event) => handleFileChange(event, setFieldValue)}
                multiple
              />
              {selectedFiles.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt={`Selected Image ${index + 1}`} className="preview-image" />
              ))}
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

            <div className='form-group'>
              <Field name="username" disabled className="disabled-field" />
            </div>

            <div className='form-group'>
              <Field name="date_time_stamp" disabled className="disabled-field" />
            </div>

            <div className="button-container">
              <button className='submit-button' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
              <Link to="/browse" className="back-button">Go back to browsing</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditArticle;