import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../auth/AuthContext';
import "./ArticleCard.scss";
import ReplyToPost from '../ReplyToPost';
import { useNavigate } from 'react-router-dom';
import { Trash2Icon } from 'lucide-react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
// import { Article, ArticleContext } from '../../context/article.context';
// import ArticleProvider from '../../context/article.context';
// import { selectedSortOption, handleSortOptionChange } from '../BrowseItems';

// useEffect(() => {
//   console.log('ArticleCard received article:', { ArticleProvider }); // Log the received Article;
// }, [ArticleProvider]);

interface Location {
  address: string;
  city: string;
}

interface ArticleCardProps {
  article: {
    _id: string; // Changed from article_id to _id
    article_name: string;
    photos: string[];
    article_category: string;
    article_description: string;
    username: string;
    date_time_stamp: string;
    status: string;
    location: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigation function
  const handleReplyButtonClick = () => {
    navigate(`/reply-to-post/${article._id}`, { state: { article } });
  };

  useEffect(() => {
    console.log('ArticleCard received article:', article);
  }, [article]);

  const handleEditPostButtonClick = () => {
    navigate(`/edit-article/${article._id}`, { state: { article } });
  };

  const handleDeletePostButtonClick = () => {
    navigate(`/delete-article/${article._id}`, { state: { article } });
  }
  
  const isOwner = loggedInUser && loggedInUser.username === article.username;

  return (
    <Card className='card-container'>
      <Card.Img variant="top" src={article.photos[0]} />
      <Card.Body>
        <Card.Title>{article.article_name}</Card.Title>
        <Card.Text>{article.article_description}</Card.Text>
        <Card.Text>{t('Category')} {article.article_category}</Card.Text>
        <Card.Text>Status: {article.status}</Card.Text>
        <Card.Text>{t('Location')} {article.location}</Card.Text>
        <Card.Text>{t('Posted by')} {article.username}</Card.Text>
        <Card.Text>{t('Date')} {new Date(article.date_time_stamp).toLocaleString()}</Card.Text>

{loggedInUser && (  
  <div className='button-container'>
    <Button onClick={handleReplyButtonClick} className='reply-button' variant="primary">{t('Reply to Post')}</Button>
    {isOwner && (
      <>
        <Button onClick={handleEditPostButtonClick} className='edit-button' variant="secondary">{t('Edit Post')}</Button>
        <Button onClick={handleDeletePostButtonClick} className='delete-button' variant="danger">
          <Trash2Icon size={18} />
        </Button>
      </>
    )}
  </div>
)}
        
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;