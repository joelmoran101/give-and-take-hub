import React, { useContext, useEffect, useMemo, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import './BrowseItems.scss';
import { Article, ArticleContext } from '../context/article.context';
import { AuthContext } from '../auth/AuthContext';
import Accordion from 'react-bootstrap/Accordion';
import LanguageSelector from '../utilities/LanguageSelector';
import Fuse from 'fuse.js'
import Header from './Header';

export type Filter = {
  available: boolean;
  reserved: boolean;
  needed: boolean;
  already_taken: boolean;
  furnitures: boolean;
  clothes: boolean;
  toys: boolean;
  elec_gadgets: boolean;
}

function BrowseItems() {
  const { loggedInUser } = useContext(AuthContext);
  const { articles } = useContext(ArticleContext);
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState<Article[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<Filter>({
    available: false,
    reserved: false,
    needed: false,
    already_taken: false,
    furnitures: false,
    clothes: false,
    toys: false,
    elec_gadgets: false
  });
const [searchQuery, setSearchQuery] = useState('');


  const filter = (c: Filter) => {
    if (Object.values(c).every(v => v === false)) {
      setArticlesToBeDisplayed(articles);
      return;
    }

    const filteredArticles = articles.filter((article: Article) => {
      return (
        (c.furnitures && article.article_category?.toLowerCase() === 'furniture') ||
        (c.toys && article.article_category?.toLowerCase() === 'toys') ||
        (c.clothes && article.article_category?.toLowerCase() === 'clothes') ||
        (c.elec_gadgets && article.article_category?.toLowerCase() === 'electronic gadgets') ||
        (c.available && article.status?.toLowerCase() === 'available') ||
        (c.reserved && article.status?.toLowerCase() === 'reserved') ||
        (c.needed && article.status?.toLowerCase() === 'needed') ||
        (c.already_taken && article.status?.toLowerCase() === 'already taken')
      );
    });
    setArticlesToBeDisplayed(filteredArticles);
  };

  useEffect(() => {
    filter(filterCriteria);
  }, [filterCriteria, articles]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='d-flex flex-column'>
      <Header 
        loggedInUser={loggedInUser} 
        filterCriteria={filterCriteria} 
        setFilterCriteria={setFilterCriteria}
        searchQuery={ searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="article-cards mx-auto">
        {isPending ? (
          <p>Loading...</p>
        ) : errors ? (
          <p>{errors}</p>
        ) : (
          articlesToBeDisplayed && Array.isArray(articlesToBeDisplayed) &&
          articlesToBeDisplayed.map((article, index) => (
            <ArticleCard article={article} key={index} />
          ))
        )}
      </div>

      <Button 
        variant="primary" 
        className="scroll-to-top-btn" 
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        Back to Top
      </Button>
    </div>
  );
}




export default BrowseItems;