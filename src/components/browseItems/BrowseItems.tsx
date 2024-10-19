import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import ArticleCard from '../articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import './BrowseItems.scss';
import { Article, ArticleContext } from '../../context/article.context';
import { AuthContext } from '../../context/auth/AuthContext';
// import Accordion from 'react-bootstrap/Accordion';
// import LanguageSelector from '../utilities/LanguageSelector';
import Fuse from 'fuse.js'
import Header from './NavBarHeader';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Reminder from './Reminder';

export type Filter = {
  category: string[];
  status: string[];
}

function BrowseItems() {
  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { articles, fetchAllArticles } = useContext(ArticleContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState<Article[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    fetchAllArticles();
  },[])

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddClick = () => {
    navigate('/add-article');
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    navigate(`/edit-article/${article.id}`);
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    navigate(`/delete-article/${article._id}`);
  };
  const [filters, setFilters] = useState<Filter>({
    category: [],
    status: [],
})

function handleCategory(category: string) {
  setFilters(prev => {
    const isSelected = prev.category.includes(category);
    return {...prev, category: isSelected ? prev.category.filter(c => c !== category) : [...prev.category, category]}
  })
}
function handleStatus(status: string) {
  setFilters(prev => {
    const isSelected = prev.status.includes(status);
    return {...prev, status: isSelected ? prev.status.filter(c => c !== status) : [...prev.status, status]}
  })
}
const [searchQuery, setSearchQuery] = useState('');
const fuseOptions = {
  keys: ['article_name', 'article_category', 'article_description', 'username', 'status'],
  threshold: 0.2  
}

const fuse = new Fuse(articles?.length ? articles : [], fuseOptions);

function handleSearch(){
  if(!searchQuery) return articles

  const results = fuse.search(searchQuery)

  return results.map(result => result.item)
}

const searchResult = useMemo(() => {
  resetFilters()
  return handleSearch()
}, [searchQuery, articles])


  useEffect(() => {
    if (searchResult) {
      setArticlesToBeDisplayed(searchResult);
    } else {
      setArticlesToBeDisplayed(articles);
    }

  }, [searchQuery, articles]);

  const allCategories = useMemo(() => {
    if(articles) return [...new Set(articles?.map((article: Article) => article.article_category))]
    return []
  }, [articles])
  const allStatuses = useMemo(() => {
    if(articles) return [...new Set(articles?.map((article: Article) => article.status))]
    return []
  }, [articles])

  function applyFilters(articles: Article[] | null, filters: Filter) {
    if (!articles) return;
    const results = articles.filter(article => {
      const matchesCategory = filters.category.length === 0 || filters.category.includes(article.article_category);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(article.status);
      return matchesCategory && matchesStatus 
    })

    setArticlesToBeDisplayed(results)
  }

  useMemo(() => {
    if (searchQuery) return
    applyFilters(articles, filters)
  }, [articles, filters]) // these dependencies will cause the effect to re-run when they change

  function resetFilters() {
    setFilters({
      category: [],
      status: [],
    })
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='d-flex flex-column'>
      <Header 
        filters = {filters}
        loggedInUser={loggedInUser} 
        handleCategory={handleCategory} 
        handleStatus={handleStatus}
        searchQuery={ searchQuery}
        setSearchQuery={setSearchQuery}
        allCategories={allCategories}
        allStatuses={allStatuses}
        resetFilters={resetFilters}
      />

      <Reminder />

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
        
      <div className='d-flex justify-content-center'>
          <Link to="/login"><button className="login-browse-btn">Login</button></Link>
          
          <Button 
            variant="primary" 
            className="scroll-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <ArrowUp size={30} />
          </Button>
      </div>

    </div>
  );
}




export default BrowseItems;