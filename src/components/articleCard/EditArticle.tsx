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
        withCredentials: true // This ensures that cookies are sent with the request
      });
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




// import React, { useState, useEffect, useContext, useMemo } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { Button, Container, Row, Col } from 'react-bootstrap'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { AuthContext } from '../../auth/AuthContext'
// import { ArticleContext } from '../../context/article.context'

// // Define the shape of your form values to match ArticleCard
// interface ArticleFormValues {
//   _id: string;
//   article_name: string;
//   photos: string[];
//   article_category: string;
//   article_description: string;
//   username: string;
//   date_time_stamp: string;
//   status: string;
//   location: string;
// }

// // Define the validation schema
// const validationSchema = Yup.object().shape({
//   article_name: Yup.string().required('Article name is required'),
//   article_description: Yup.string().required('Description is required'),
//   article_category: Yup.string().required('Category is required'),
//   status: Yup.string().required('Status is required'),
//   location: Yup.string().required('Location is required'),
// })

// // Mock fetchArticle function (replace with actual API call)
// const fetchArticle = async (id: string): Promise<ArticleFormValues> => {
//   // Simulating API call
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return {
//     _id: id,
//     article_name: 'Sample Article',
//     photos: ['https://example.com/photo.jpg'],
//     article_category: 'electronics',
//     article_description: 'This is a sample article description.',
//     username: 'john_doe',
//     date_time_stamp: new Date().toISOString(),
//     status: 'available',
//     location: 'New York, NY'
//   };
// }

// const EditArticle: React.FC = () => {
//   const { loggedInUser } = useContext(AuthContext);
//   const { articles, getArticle } = useContext(ArticleContext);
//   const navigate = useNavigate();
//   const { articleId } = useParams<{ articleId: string }>();
//   const location = useLocation();
//   const [sent, setSent] = useState(false);
//   const [article, setArticle] = useState<ArticleFormValues | null>(null);

//   // const currentArticle = useMemo(() => {
//     const currentArticle = useMemo(() => {
//       if (!articles || !articleId) return null;
//       return getArticle(articleId);
//     }, [articles, articleId]);

//   const [initialValues, setInitialValues] = useState<ArticleFormValues | null>(null);

//   useEffect(() => {
//     const loadArticle = async () => {
//       if (articleId) {
//         const article = await fetchArticle(articleId);
//         setInitialValues(article);
//       }
//     };
//     loadArticle();
//   }, [articleId]);

//   // Handle form submission
//   const handleSubmit = (values: ArticleFormValues, { setSubmitting }: any) => {
//     // TODO: Implement your API call to update the article here
//     console.log(values);
//     setSubmitting(false);
//   }

//   if (!initialValues) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <h1 className="my-4">Edit Article</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <Row>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <label htmlFor="article_name" className="form-label">Article Name</label>
//                   <Field type="text" name="article_name" className="form-control" />
//                   <ErrorMessage name="article_name" component="div" className="text-danger" />
//                 </div>
//               </Col>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <label htmlFor="article_category" className="form-label">Category</label>
//                   <Field as="select" name="article_category" className="form-control">
//                     <option value="">Select a category</option>
//                     <option value="electronics">Electronics</option>
//                     <option value="furniture">Furniture</option>
//                     <option value="clothing">Clothing</option>
//                     {/* Add more categories as needed */}
//                   </Field>
//                   <ErrorMessage name="article_category" component="div" className="text-danger" />
//                 </div>
//               </Col>
//             </Row>
//             <div className="mb-3">
//               <label htmlFor="article_description" className="form-label">Description</label>
//               <Field as="textarea" name="article_description" className="form-control" rows={3} />
//               <ErrorMessage name="article_description" component="div" className="text-danger" />
//             </div>
//             <Row>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <label htmlFor="status" className="form-label">Status</label>
//                   <Field as="select" name="status" className="form-control">
//                     <option value="">Select a status</option>
//                     <option value="available">Available</option>
//                     <option value="pending">Pending</option>
//                     <option value="taken">Taken</option>
//                   </Field>
//                   <ErrorMessage name="status" component="div" className="text-danger" />
//                 </div>
//               </Col>
//               <Col md={6}>
//                 <div className="mb-3">
//                   <label htmlFor="location" className="form-label">Location</label>
//                   <Field type="text" name="location" className="form-control" />
//                   <ErrorMessage name="location" component="div" className="text-danger" />
//                 </div>
//               </Col>
//             </Row>
//             <div className="mb-3">
//               <label htmlFor="photos" className="form-label">Photos</label>
//               <Field type="text" name="photos[0]" className="form-control" />
//               <ErrorMessage name="photos" component="div" className="text-danger" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username</label>
//               <Field type="text" name="username" className="form-control" disabled />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="date_time_stamp" className="form-label">Date Posted</label>
//               <Field type="text" name="date_time_stamp" className="form-control" disabled />
//             </div>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? 'Updating...' : 'Update Article'}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   )
// }

// export default EditArticle


// // import React, { useEffect, useState } from 'react'
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { Article } from '../../context/article.context';

// // function EditArticle() {
// //     const [article, setArticle] = useState<Article | null>(null)
// //     const { articleId } = useParams<{ articleId: string }>();
// //     const navigate = useNavigate();
// //         function fetchArticle(articleId: string) {
// //             try {
// //                 const response: any = axios.get(import.meta.env.VITE_BACKEND_HOST + `/api/getArticle/${articleId}`);
// //                 setArticle(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching article:', error);
// //                 alert('Article not found.');
// //                 navigate('/browse');
// //             }
            
// //         }
// //     useEffect(() => {
// //        if (articleId) fetchArticle(articleId)
// //         else navigate('/browse')
// //     }, [articleId])
// //   return (
// //     <div>
        
      
// //     </div>
// //   )
// // }

// // export default EditArticle
