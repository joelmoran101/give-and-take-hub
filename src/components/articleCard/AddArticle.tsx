import React, { useContext, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { AuthContext } from '../../context/auth/AuthContext';
import { Article, ArticleContext } from '../../context/article.context';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import './AddArticle.css';

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
  const { t } = useTranslation();
  const { loggedInUser } = useContext(AuthContext);
  const { addArticle } = useContext(ArticleContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const chooseFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleCapture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
          setSelectedFiles(prev => [...prev, file]);
          setShowCamera(false);
        });
    }
  }, [webcamRef]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
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
      await addArticle({ ...values, photos: selectedFiles.map(file => URL.createObjectURL(file)) } as Article, selectedFiles);
      resetForm();
      setSelectedFiles([]);
      navigate('/browse');
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Error adding article: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='add-article'>
      <h2>{t('Add an Article')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={AddArticleSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className='form-group'>
              <Field name="article_name" placeholder={t('Article Name')} />
              <ErrorMessage name="article_name" component="div" className="error" />
            </div>

            <div className='form-group'>
              <input
                type="file"
                onChange={handleFileChange}
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
              {selectedFiles.map((file, index) => (
                <img key={index} className='w-25' src={URL.createObjectURL(file)} alt="Selected Image" />
              ))}
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
              <Field name="date_time_stamp" type="datetime-local" placeholder="Date and Time" />
              <ErrorMessage name="date_time_stamp" component="div" className="error" />
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

            <div className="button-container">
              <button className='submit-button' type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('Submitting...') : t('Submit')}
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
};

export default AddArticle;