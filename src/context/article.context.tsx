import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import maxios from '../utilities/maxios'
import { Trophy } from "lucide-react";
import { useAuth } from "./auth/AuthContext";

export type Article={
  _id: string,
  userId: string,
  article_id: string | null,
  photos: string[],
  images: string[],
  article_name: string,
  article_category: string,
  article_description: string,
  username: string,
  date_time_stamp: string,
  status: string,
  location: string,
  deleted_photos?: string[]
}
// are used to decribe methods of an object; while type is used to describe any type of data
interface IArticleContext {
    articles: Article[] | null,
    setArticles: React.Dispatch<React.SetStateAction<Article[] | null>>
    getArticle: (articleId: string) => Article | null
    editArticle: (articleId: string, newArticleData: Article, selectedFiles?: File[]) => Promise<any>
    deleteArticle: (articleId: string) => Promise<any>,
    addArticle: (newArticleData: Article, selectedFiles?: File[]) => Promise<any>,
    fetchAllArticles: () => void
}

export const ArticleContext = createContext<IArticleContext>({
  articles: null, 
  setArticles: () => {}, 
  getArticle: () => null,
  editArticle: async () => {},
  deleteArticle: async () => {},
  addArticle: async () => {},
  fetchAllArticles: async () => {}
})

function ArticleProvider({ children }:{children: React.ReactNode}) {
    const { loggedInUser } = useAuth()
    const [articles, setArticles] = useState<Article[] | null>(null)

    // useEffect(() => {
    //   fetchAllArticles()
    // }, [])

    // useEffect(() => {
    //     console.log("ARTICLES FETCHED FROM:::", articles)
    // }, [articles])

    const fetchAllArticles = async () => {
      console.log('FETCHING ARTICLES:::')
      axios.get(import.meta.env.VITE_BACKEND_HOST + '/articles')
      // the following line is just to mock the DB 
      // maxios.get('success', data)      
      .then((response: {data: any}) => {
          setArticles(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
    }
    const getArticle = (articleId: string) => {
        return articles?.find(article => article._id === articleId) || null
    }

    const addArticle = async (newArticleData: Article, selectedFiles?: File[]) => {
      const formData = new FormData();
      if (selectedFiles) selectedFiles.forEach((photo) => {
        formData.append('files', photo);
      })

      formData.append('article_name', newArticleData.article_name);
      formData.append('article_category', newArticleData.article_category);
      formData.append('article_description', newArticleData.article_description);
      formData.append('date_time_stamp', newArticleData.date_time_stamp);
      formData.append('status', newArticleData.status);
      formData.append('location', newArticleData.location); 

      const response:any = await axios.post(import.meta.env.VITE_BACKEND_HOST +'/add-article', formData, {headers: { "Content-Type": "multipart/form-data" }});
      console.log('Article added successfully:', response.data); 
      if (response.data.article) {
        setArticles([{...response.data.article, username: loggedInUser?.username}, ...articles!])
      }
    }

    const editArticle = async (articleId: string, newArticleData: Article, newAddedPhotos?: File[]) => {
      const formData = new FormData();
      if (newAddedPhotos) newAddedPhotos.forEach((file) => {
        formData.append('files', file);
      });
  
      formData.append('article_name', newArticleData.article_name);
      formData.append('article_category', newArticleData.article_category);
      formData.append('article_description', newArticleData.article_description);
      formData.append('status', newArticleData.status);
      formData.append('location', newArticleData.location);
      if (newArticleData.photos) {
        newArticleData.photos.forEach((photo, index) => {
          formData.append(`photos[${index}]`, photo);
        });
      }
      console.log('NEW ADDED PHOTOS:::', newAddedPhotos);
      console.dir(formData)
      console.log(newArticleData.photos)
      try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/edit-article/${articleId}`, formData, {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        })
        const newList = articles?.map(article => {
          if (article._id === articleId) {
            article.article_name = newArticleData.article_name
            article.article_category = newArticleData.article_category
            article.article_description = newArticleData.article_description
            article.status = newArticleData.status
            article.location = newArticleData.location
          }
          return article
        })
        setArticles(newList || articles)
        return response
      }
      catch (error) {
        console.log(error)
        throw error

      }
    };
    const deleteArticle = async (articleId: string) => {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/delete-article/${articleId}`, {
        withCredentials: true
        
      })
      const newList = articles?.filter(article => article._id !== articleId)
      setArticles(newList || articles)
      return response
    };

    return (
        <ArticleContext.Provider value={{ articles, setArticles, getArticle, editArticle, deleteArticle, addArticle, fetchAllArticles }}>
            {children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider