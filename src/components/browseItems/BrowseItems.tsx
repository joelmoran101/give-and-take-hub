import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import ArticleCard from '../articleCard/ArticleCard';
import { Button } from 'react-bootstrap';
import './BrowseItems.scss';
import { Article, ArticleContext } from '../../context/article.context';
import { AuthContext } from '../../context/auth/AuthContext';
import Fuse from 'fuse.js'
import Header from './NavBarHeader';
import { useTranslation } from 'react-i18next';
import Reminder from './Reminder';

export type Filter = {
  category: string[];
  status: string[];
}

type SortOption = 'username' | 'category' | 'status' | 'date';

function BrowseItems() {
  const { t } = useTranslation();
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { articles, fetchAllArticles } = useContext(ArticleContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[] | null>(null);
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState<Article[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>('date');

  useEffect(() => {
    fetchAllArticles();
  }, [])

  useEffect(() => {
    console.log('ARTICLES TO BE DISPLAYED:::', articlesToBeDisplayed)
  }, [articlesToBeDisplayed])

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleSort = (sortBy: SortOption) => {
    setCurrentSort(sortBy);
    if (!filteredArticles) return;


    const sortedArticles = [...filteredArticles].sort((a, b) => {
      switch (sortBy) {
        case 'username':
          return a.userId?.localeCompare(b.userId);
        case 'category':
          return a.article_category?.localeCompare(b.article_category);
        case 'status':
          return a.status?.localeCompare(b.status);
        case 'date':
          return new Date(b.date_time_stamp).getTime() - new Date(a.date_time_stamp).getTime();
        default:
          return 0;
      }
    });

    setArticlesToBeDisplayed(sortedArticles);
  };

  const handleAddClick = () => {
    navigate('/add-article');
  };

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    navigate(`/edit-article/${article._id}`);
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

  const fuse = useMemo(() => new Fuse(articles?.length ? articles : [], fuseOptions), [articles]);

  useEffect(() => {
    if (!articles) return;
    let result

    // Apply filters
    result = articles.filter(article => {
      const matchesCategory = filters.category.length === 0 || filters.category.includes(article.article_category);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(article.status);
      return matchesCategory && matchesStatus;
    });

    // Apply search
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      result = searchResults.map(result => result.item);
    }
    
    setFilteredArticles(result);
  }, [articles, filters, searchQuery, fuse]);

  useEffect(() => {
    if (!filteredArticles) return;
    handleSort(currentSort);

  }, [filteredArticles, currentSort]);

  const allCategories = useMemo(() => {
    if(articles) return [...new Set(articles?.map((article: Article) => article.article_category))]
    return []
  }, [articles])

  const allStatuses = useMemo(() => {
    if(articles) return [...new Set(articles?.map((article: Article) => article.status))]
    return []
  }, [articles])

  function resetFilters() {
    setFilters({
      category: [],
      status: [],
    });
    setSearchQuery('');
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
        filters={filters}
        loggedInUser={loggedInUser} 
        handleSort={handleSort}
        currentSort={currentSort}
        handleCategory={handleCategory} 
        handleStatus={handleStatus}
        searchQuery={searchQuery}
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
          {!loggedInUser && (
              <Link to="/login">
                <button className="login-browse-btn">{t('Login')}</button>
              </Link>
          )}
          
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