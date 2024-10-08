import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../auth/AuthContext';
import "./ArticleCard.scss";
import ReplyToPost from '../ReplyToPost';
import { useNavigate } from 'react-router-dom';
import { Trash2Icon } from 'lucide-react';
// import { selectedSortOption, handleSortOptionChange } from '../BrowseItems';

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
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Get the navigation function
  const handleReplyButtonClick = () => {
    navigate(`/reply-to-post/${article._id}`, { state: { article } });
  };

  const handleEditButtonClick = () => {
    navigate(`/edit-article/${article._id}`, { state: { article } });
  };

  const handleDeleteButtonClick = () => {
    navigate(`/delete-article/${article._id}`, { state: { article } });
  }
  console.log('Aticle data: ', article);
  return (
    <Card className='card-container'>
      <Card.Img variant="top" src={article.photos[0]} />
      <Card.Body>
        <Card.Title>{article.article_name}</Card.Title>
        <Card.Text>{article.article_description}</Card.Text>
        <Card.Text>Category: {article.article_category}</Card.Text>
        <Card.Text>Status: {article.status}</Card.Text>
        <Card.Text>Location: {article.location}</Card.Text>
        <Card.Text>Posted by: {article.username}</Card.Text>
        <Card.Text>Date: {article.date_time_stamp}</Card.Text>

              {loggedInUser && (  
          <div className='button-container'>
            <Button onClick={handleReplyButtonClick} className='reply-button' variant="primary">Reply to Post</Button>
            <Button onClick={handleEditButtonClick} className='edit-button' variant="secondary">Edit Post</Button>
            <Button onClick={handleDeleteButtonClick} className='delete-button' variant="danger">
              <Trash2Icon size={18} />
              {/* <span className="ml-2">Delete Post</span> */}
            </Button>
            
          </div>
        )
        
    }
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;