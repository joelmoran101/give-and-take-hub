import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { Article, ArticleContext } from '../../context/article.context';
import './EditArticle.scss';
import { use } from 'i18next';

interface ArticleFormValues {
  _id: string;
  article_name: string;
  photos: string[];
  images: string[];
  article_category: string;
  article_description: string;
  username: string;
  date_time_stamp: string;
  status: string;
  location: string;
}

const EditArticleSchema = Yup.object().shape({
  article_name: Yup.string().required('Article Name is required'),
  photos: Yup.array(),
  images: Yup.array(),
  article_category: Yup.string().required('Category is required'),
  article_description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
});

const EditArticle: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { getArticle, editArticle } = useContext(ArticleContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  
  const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(null);

  // const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);

  const [newAddedPhotos, setNewAddedPhotos] = useState<File[]>([]);

  useEffect(() => {
    console.log('EDIT FORM VALUES:::', initialValues)
    
  },[initialValues])

  const thumbnails = useMemo(() => {
      const newUrls = newAddedPhotos.map((file) => URL.createObjectURL(file));
      const oldUrls = (initialValues?.photos || []).map((url) => url);
      return [ ...oldUrls, ...newUrls];
  }, [initialValues, newAddedPhotos]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
  //   const files = Array.from(event.target.files || []);
  //   setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  //   setFieldValue('photos', [...(initialValues?.photos || []), ...files.map(file => URL.createObjectURL(file))]);
  // };


  const handleDeleteImage = (index: number, setFieldValue: (field: string, value: any) => void) => {
    setInitialValues((prevValues) => {
      if (!prevValues) return null;
      const newPhotos = prevValues.photos.filter((_, i) => i !== index);
      setFieldValue('photos', newPhotos);

      // const deletedPhoto = prevValues.photos[index];
      // setDeletedPhotos(prev => [...prev, deletedPhoto]);

      return { ...prevValues, photos: newPhotos };
    });
    // setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
  //   handleFileChange(event, setFieldValue);
  //   setInitialValues(prevValues => {
  //     if (!prevValues) return null;
  //     return {
  //       ...prevValues,
  //       photos: [...prevValues.photos, ...Array.from(event.target.files || []).map(file => URL.createObjectURL(file))]
  //     };
  //   });
  // };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const files= Array.from(event.target.files);
    // setFieldValue('photos', files); // Update the 'photos' field
    setNewAddedPhotos(files);
  };

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

  const handleSubmit = async (values: ArticleFormValues, { setSubmitting }: FormikHelpers<ArticleFormValues>) => {


    try {


      const response = await editArticle(articleId || '', values as Article, newAddedPhotos);
      console.log('Article updated successfully:', response.data);
      navigate('/browse');
    } catch (error) {
      console.error('Error updating article:', error);
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

            <div className="images-container">
              {thumbnails.length > 0 ? (
                thumbnails.map((image, index) => (
                  <div key={index} className="image-thumbnail-container">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="image-thumbnail"
                    />
                    <button
                      type="button"
                      className="delete-image-button"
                      aria-label='Delete Image'
                      title='Delete Image'
                      onClick={() => handleDeleteImage(index, setFieldValue)}
                    >
                      &#10005;
                    </button>
                  </div>
                ))
              ) : (
                <p>No images yet; choose and add now</p>
              )}
            </div>

            <div className='form-group'>
              <input
                type="file"
                onChange={(event) => handleAddImages(event, setFieldValue)}
                multiple
                accept="image/*"
              />
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
