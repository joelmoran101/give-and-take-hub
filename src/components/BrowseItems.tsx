import React, { useContext, useEffect, useMemo, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import './BrowseItems.scss';
import { Article, ArticleContext } from '../context/article.context';
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
                  <NavDropdown.Item href="#action3">Location</NavDropdown.Item>
                  <div className="category">
                    <NavDropdown.Item href="#action4">Furnitures</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Toys</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Clothes</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Electric Gadgets</NavDropdown.Item>
                  </div>
                  <div className="status">
                    <NavDropdown.Item href="#action4">Available</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Reserved</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Needed</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Already Taken</NavDropdown.Item>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Show All</NavDropdown.Item>                              
              </NavDropdown>

              <Nav.Link href="#" disabled>About</Nav.Link>
                            
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

// export const [selectedSortOption, setSelectedSortOption] = useState('');

// export const handleSortOptionChange = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
//   setSelectedSortOption(event.currentTarget.text);
// };


// Main BrowseItems component
function BrowseItems() {
  const [isPending, setIsPending] = useState(false)
  const {articles} = useContext(ArticleContext)
  const [articlesToBeDisplayed, setArticlesToBeDisplayed] = useState(null)
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

  function filter(c:Filter){
    if(!c.location && !c.available && !c.reserved && !c.needed && !c.already_taken)
      return setArticlesToBeDisplayed(articles)

    const filteredArticles = articles.filter((article: Article) => {
      if(article.status?.includes('available') && c.available) return true
  })
};

  
  const [errors, setErrors] = useState(null)

  return (
    <div className='d-flex flex-column '>

        {renderHeader()}        


      <div className="article-cards mx-auto">
        {isPending ? (
          <p>Loading...</p>
        ) : errors ? (
          <p>{errors}</p>
        ) : (
          articles && Array.isArray(articles) &&
          articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        )}
      </div>
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