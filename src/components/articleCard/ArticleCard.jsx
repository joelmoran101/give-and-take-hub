import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h2 className="classification-header">{article.classification}</h2>
      <img src={article.image} alt={article.title} className="article-image" />
      <h3 className="article-title">{article.title}</h3>
      <p className="article-description">{article.description}</p>
      <div className="button-container">
        <Link to={`/articles/${article.id}`}>
          <button className="read-more-button">Read More</button>
        </Link>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
        <button className="search-button">Search for Another Article</button>
      </div>
    </div>
  );
}

export default ArticleCard;