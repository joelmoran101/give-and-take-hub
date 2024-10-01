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
  category: string[];
  status: string[];
}

function BrowseItems() {
  const { loggedInUser } = useContext(AuthContext);
  const { articles } = useContext(ArticleContext);
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState<Article[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
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
  console.log('THIS SHOULD NOT BE CONSOLE LOGGED :::', searchQuery)
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
    console.log('DEBUG: resetting filters')
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