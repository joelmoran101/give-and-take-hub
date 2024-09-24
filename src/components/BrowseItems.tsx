import React, { useContext, useEffect, useMemo, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import './BrowseItems.scss';
import { Article, ArticleContext } from '../context/article.context';
import { AuthContext } from '../auth/AuthContext';
import Accordion from 'react-bootstrap/Accordion';
// Define the Location interface

export type Filter = {
  location: boolean,
  available: boolean,
  reserved: boolean,
  needed: boolean,
  already_taken: boolean,
  furnitures: boolean,
  clothes: boolean,
  toys: boolean,
  elec_gadgets: boolean
}


// export const [selectedSortOption, setSelectedSortOption] = useState('');

// export const handleSortOptionChange = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
//   setSelectedSortOption(event.currentTarget.text);
// };


// Main BrowseItems component
function BrowseItems() {
  const { loggedInUser } = useContext(AuthContext)
  const [isPending, setIsPending] = useState(false)
  const {articles} = useContext(ArticleContext)
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState<Article[] | null >(null)

  const [filterCriteria, setFilterCriteria] = useState({
    location: false,
    available: false,
    reserved: false,
    needed: false,
    already_taken: false,
    furnitures: false,
    clothes: false,
    toys: false,
    elec_gadgets: false
  })

  // Header rendering function
function renderHeader() {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>

              <NavDropdown title="Sort by:" id="navbarScrollingDropdown">

                  <NavDropdown.Item href="#action3">Date</NavDropdown.Item>

                  <NavDropdown.Item href="#action4">Status</NavDropdown.Item>
        
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Show All Articles</NavDropdown.Item>
              </NavDropdown>
                                
              <NavDropdown title="Filter by:" id="navbarScrollingDropdown">
                  {/* <NavDropdown.Item href="#action3">Location</NavDropdown.Item> */}

                  <NavDropdown.Item href="#action3">
                      <div className="category">
                        <Dropdown>
                            <Accordion onClick={e => e.stopPropagation()}>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>Categories</Accordion.Header>
                                <Accordion.Body>
                                    <Dropdown.Item className={filterCriteria.furnitures ? 'active-filter': ''} onClick={e => setFilterCriteria({ ...filterCriteria, furnitures: !filterCriteria.furnitures })}>Furnitures</Dropdown.Item>
                                    <Dropdown.Item className={filterCriteria.toys ? 'active-filter': ''} onClick={e => setFilterCriteria({ ...filterCriteria, toys: !filterCriteria.toys })}>Toys</Dropdown.Item>
                                    <Dropdown.Item className={filterCriteria.clothes ? 'active-filter': ''} onClick={e => setFilterCriteria({ ...filterCriteria, clothes: !filterCriteria.clothes })}>Clothes</Dropdown.Item>
                                    <Dropdown.Item className={filterCriteria.elec_gadgets ? 'active-filter': ''} onClick={e => setFilterCriteria({ ...filterCriteria, elec_gadgets: !filterCriteria.elec_gadgets })}>Electric Gadgets</Dropdown.Item>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                        </Dropdown>
                      </div>                      
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#action3">
                      <div className="status">
                        <Dropdown>
                          <Accordion onClick={e => e.stopPropagation()}>
                              <Accordion.Item eventKey="0">
                                <Accordion.Header>Status</Accordion.Header>
                                  <Accordion.Body>
                                    <Dropdown.Item href="#action4">Available</Dropdown.Item>
                                    <Dropdown.Item href="#action4">Reserved</Dropdown.Item>
                                    <Dropdown.Item href="#action4">Needed</Dropdown.Item>
                                    <Dropdown.Item href="#action4">Already Taken</Dropdown.Item>
                                  </Accordion.Body>
                              </Accordion.Item>
                          </Accordion>
                        </Dropdown>
                      </div>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Show All</NavDropdown.Item>                              
              </NavDropdown>

              {loggedInUser ? (
                <Nav.Link href="/add-article">Post New Article</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              
              <Nav.Link href="/about" >About</Nav.Link>
                            
            </Nav>

            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>

            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}


function filter(c: Filter) {
  console.log("DEBUG FILTER")
  if(Object.values(c).every(v => v === false)) return setArticlesToBeDisplayed(articles)

  const filteredArticles = articles.filter((article: Article) => {
    switch (true) {
      case c.furnitures && article.article_category?.toLowerCase() === 'furniture': return true
      case c.toys && article.article_category?.toLowerCase() === 'toys': return true
      case c.clothes && article.article_category?.toLowerCase() === 'clothes': return true
      case c.elec_gadgets && article.article_category?.toLowerCase() === 'electronic gadgets': return true
      default: return false
    }

  });
  setArticlesToBeDisplayed(filteredArticles);
}

useEffect(() => {
  console.log("FILTER EFFECT")
  filter(filterCriteria)
}, [filterCriteria, articles])


//   function filter(c:Filter){
//     if(!c.location && !c.available && !c.reserved && !c.needed && !c.already_taken)
//       return setArticlesToBeDisplayed(articles)

//     const filteredArticles = articles.filter((article: Article) => {
//       if(article.status?.includes('available') && c.available) return true
//   })
// };




  
  const [errors, setErrors] = useState(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className='d-flex flex-column '>

        {renderHeader()}        


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

      <Button variant="primary" className="scroll-to-top-btn" onClick={scrollToTop}>
         Back to Top
      </Button>

    </div>
  );

  // useEffect(() => {
  //   setIsPending(true)
  //   axios.get('/api/items')
  //   .then((response:any) => {
  //     setArticles(response.data)
  //     setErrors(null)
  //     setIsPending(false)
  //   })
  //   .catch(error => {
  //     setErrors(error)
  //     setArticles(null)
  //     setIsPending(false)
  //   })
  // }, [])



}

export default BrowseItems;