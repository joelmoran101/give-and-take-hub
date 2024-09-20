import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./ArticleCard.scss";
// import { selectedSortOption, handleSortOptionChange } from '../BrowseItems';

interface Location {
  address: string;
  city: string;
  // Add any other location properties you have
}

interface ArticleCardProps {
  article: {
    _id: string; // Changed from article_id to _id
    article_name: string;
    picture_url: string;
    article_category: string;
    article_description: string;
    username: string;
    date_time_stamp: string;
    status: string;
    location: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  console.log('Aticle data: ', article);
  return (
    <Card className='card-container'>
      <Card.Img variant="top" src={article.picture_url} />
      <Card.Body>
        <Card.Title>{article.article_name}</Card.Title>
        <Card.Text>{article.article_description}</Card.Text>
        <Card.Text>Category: {article.article_category}</Card.Text>
        <Card.Text>Status: {article.status}</Card.Text>
        <Card.Text>Location: {article.location}</Card.Text>
        <Card.Text>Posted by: {article.username}</Card.Text>
        <Card.Text>Date: {article.date_time_stamp}</Card.Text>
        <Button variant="primary">Reply to Post</Button>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;