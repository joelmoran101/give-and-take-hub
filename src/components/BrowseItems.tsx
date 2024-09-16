import React, { useEffect, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import { connectToDatabase } from '../config/mongoDb';
import { WithId, Document } from 'mongodb';

// Define the Location interface
interface Location {
  address: string;
  city: string;
  // Add any other location properties you have
}

// Define the CustomArticle interface
interface CustomArticle extends Omit<WithId<Document>, 'location'> {
  _id: string;
  article_name: string;
  picture_url: string;
  article_category: string;
  article_description: string;
  username: string;
  date_time_stamp: string;
  availability: string;
  location: Location;
}

type Article = CustomArticle;

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
              <NavDropdown.Item href="#action3">Available Articles</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Needed Items
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Show All Articles
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Filter by:" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Location</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Article Category
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Show All
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              About
            </Nav.Link>
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

// Main BrowseItems component
function BrowseItems() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { db } = await connectToDatabase();
        const articlesCollection = db.collection('articles');
        const articlesData = await articlesCollection.find().toArray();

        const articles: Article[] = articlesData.map((article: CustomArticle) => ({
          ...article,
          location: article.location as Location,
        }));

        setArticles(articles);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setError('Failed to fetch articles. Please try again later.');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <header className='optionHeaders'>
        {renderHeader()}        
      </header>

      <div className="article-cards">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

export default BrowseItems;