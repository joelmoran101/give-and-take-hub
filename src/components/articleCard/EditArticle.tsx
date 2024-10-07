import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

// Define the shape of your form values to match ArticleCard
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

// Define the validation schema
const validationSchema = Yup.object().shape({
  article_name: Yup.string().required('Article name is required'),
  article_description: Yup.string().required('Description is required'),
  article_category: Yup.string().required('Category is required'),
  status: Yup.string().required('Status is required'),
  location: Yup.string().required('Location is required'),
})

// Mock fetchArticle function (replace with actual API call)
const fetchArticle = async (id: string): Promise<ArticleFormValues> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    _id: id,
    article_name: 'Sample Article',
    photos: ['https://example.com/photo.jpg'],
    article_category: 'electronics',
    article_description: 'This is a sample article description.',
    username: 'john_doe',
    date_time_stamp: new Date().toISOString(),
    status: 'available',
    location: 'New York, NY'
  };
}

function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (id) {
        const article = await fetchArticle(id);
        setInitialValues(article);
      }
    };
    loadArticle();
  }, [id]);

  // Handle form submission
  const handleSubmit = (values: ArticleFormValues, { setSubmitting }: any) => {
    // TODO: Implement your API call to update the article here
    console.log(values);
    setSubmitting(false);
  }

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="my-4">Edit Article</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="article_name" className="form-label">Article Name</label>
                  <Field type="text" name="article_name" className="form-control" />
                  <ErrorMessage name="article_name" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="article_category" className="form-label">Category</label>
                  <Field as="select" name="article_category" className="form-control">
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    {/* Add more categories as needed */}
                  </Field>
                  <ErrorMessage name="article_category" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
            <div className="mb-3">
              <label htmlFor="article_description" className="form-label">Description</label>
              <Field as="textarea" name="article_description" className="form-control" rows={3} />
              <ErrorMessage name="article_description" component="div" className="text-danger" />
            </div>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <Field as="select" name="status" className="form-control">
                    <option value="">Select a status</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="taken">Taken</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <Field type="text" name="location" className="form-control" />
                  <ErrorMessage name="location" component="div" className="text-danger" />
                </div>
              </Col>
            </Row>
            <div className="mb-3">
              <label htmlFor="photos" className="form-label">Photos</label>
              <Field type="text" name="photos[0]" className="form-control" />
              <ErrorMessage name="photos" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <Field type="text" name="username" className="form-control" disabled />
            </div>
            <div className="mb-3">
              <label htmlFor="date_time_stamp" className="form-label">Date Posted</label>
              <Field type="text" name="date_time_stamp" className="form-control" disabled />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Article'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default EditArticle


// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { Article } from '../../context/article.context';

// function EditArticle() {
//     const [article, setArticle] = useState<Article | null>(null)
//     const { articleId } = useParams<{ articleId: string }>();
//     const navigate = useNavigate();
//         function fetchArticle(articleId: string) {
//             try {
//                 const response: any = axios.get(import.meta.env.VITE_BACKEND_HOST + `/api/getArticle/${articleId}`);
//                 setArticle(response.data);
//             } catch (error) {
//                 console.error('Error fetching article:', error);
//                 alert('Article not found.');
//                 navigate('/browse');
//             }
            
//         }
//     useEffect(() => {
//        if (articleId) fetchArticle(articleId)
//         else navigate('/browse')
//     }, [articleId])
//   return (
//     <div>
        
      
//     </div>
//   )
// }

// export default EditArticle
