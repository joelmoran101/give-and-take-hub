import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { AuthContext } from '../../context/auth/AuthContext';
import { Article, ArticleContext } from '../../context/article.context';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import './EditArticle.scss';

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

export default function EditArticle() {
  const { loggedInUser } = useContext(AuthContext);
  const { getArticle, editArticle } = useContext(ArticleContext);
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();

  const { t } = useTranslation();
  const chooseFileRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  
  const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(null);
  const [newAddedPhotos, setNewAddedPhotos] = useState<File[]>([]);
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  const oldUrls = useMemo(() => {
    return (initialValues?.photos || []).filter(url => !deletedPhotos.includes(url));
  }, [initialValues, deletedPhotos]);

  const thumbnails = useMemo(() => {
    const newUrls = newAddedPhotos.map((file) => URL.createObjectURL(file));
    return [...oldUrls, ...newUrls];
  }, [oldUrls, newAddedPhotos]);

  const handleDeleteImage = (index: number) => {
    if (index < (oldUrls?.length || 0)) {
      // It's an existing photo
      const photoUrl = oldUrls[index];
      setDeletedPhotos(prev => [...prev, photoUrl]);
    } else {
      // It's a newly added photo
      const newIndex = index - (oldUrls?.length || 0);
      setNewAddedPhotos(prev => prev.filter((_, i) => i !== newIndex));
    }
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewAddedPhotos(prevFiles => [...prevFiles, ...files]);
  };

  const handleCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
          setNewAddedPhotos(prev => [...prev, file]);
          setShowCamera(false);
        });
    }
  }, [webcamRef]);

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
      const updatedValues = {
        ...values,
        deleted_photos: deletedPhotos,
        photos: oldUrls,
      };

      const response = await editArticle(articleId || '', updatedValues as Article, newAddedPhotos);
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
      <h2>{t('Edit Article')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={EditArticleSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className='form-group'>
              <Field name="article_name" placeholder={t('Article Name')} />
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
                      aria-label={t('Delete Image')}
                      title={t('Delete Image')}
                      onClick={() => handleDeleteImage(index)}
                    >
                      &#10005;
                    </button>
                  </div>
                ))
              ) : (
                <p>{t('No images added yet')}</p>
              )}
            </div>

            <div className='form-group'>
              <input
                type="file"
                onChange={handleAddImages}
                multiple
                accept="image/*"
                ref={chooseFileRef}
                hidden
              />
              <Button variant="primary" onClick={() => chooseFileRef.current?.click()}>
                {t('Add Images')}
              </Button>
              <Button variant="secondary" onClick={() => setShowCamera(true)}>
                {t('Take Photo')}
              </Button>
            </div>

            <div className='form-group'>
              <Field name="article_category" placeholder={t('Category')} />
              <ErrorMessage name="article_category" component="div" className="error" />
            </div>

            <div className='form-group'>
              <Field name="article_description" as="textarea" placeholder={t('Description')} />
              <ErrorMessage name="article_description" component="div" className="error" />
            
            </div>

            <div className='form-group'>
              <Field name="status" as="select">
                <option value="">{t('Select Status')}</option>
                <option value="available">{t('Available')}</option>
                <option value="reserved">{t('Reserved')}</option>
                <option value="taken">{t('Taken')}</option>
                <option value="needed">{t('Needed')}</option>
              </Field>
              <ErrorMessage name="status" component="div" className="error" />
            </div>

            <div className='form-group'>
              <Field name="location" placeholder={t('Location')} />
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
                {isSubmitting ? 'Updating...' : t('Update')}
              </button>
              <Link to="/browse" className="back-button">{t('Go back to browsing')}</Link>
            </div>
          </Form>
        )}
      </Formik>

      <Modal show={showCamera} onHide={() => setShowCamera(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Take a Photo')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{ facingMode: "environment" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCamera(false)}>
            {t('Close')}
          </Button>
          <Button variant="primary" onClick={handleCapture}>
            {t('Capture')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}