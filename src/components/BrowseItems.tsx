import React, { useContext, useEffect, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import './BrowseItems.scss';
import { ArticleContext } from '../context/article.context';
// Define the Location interface

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
                  <NavDropdown.Item href="#action4">Article Category</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Status</NavDropdown.Item>
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

  // const [selectedSortOption, setSelectedSortOption] = useState('');
  // const handleSortOptionChange = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
  //   setSelectedSortOption(event.currentTarget.text);
  // };
  
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