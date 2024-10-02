import { Accordion, Button, Container, Dropdown, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Filter } from "./BrowseItems";
import LanguageSelector from "../utilities/LanguageSelector";
import { Link } from "react-router-dom";


function FilterAccordion({ title, filters, handler,selectedFilters }: {
    title: string;
    filters: string[];
    selectedFilters: string[];
    handler: (criteria: string) => void;
  }) {
    return (
      <Dropdown>
        <Accordion onClick={e => e.stopPropagation()}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {filters.map((filterName, index) => (
                <Dropdown.Item 
                  key={index}
                  className={selectedFilters.includes(filterName) ? 'active-filter': ''}
                  onClick={() => handler(filterName)}
                >
                  {filterName}
                </Dropdown.Item>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Dropdown>
    );
  }
type HeaderProps = {
  loggedInUser: any;
  filters: Filter;
  allCategories: string[];
  allStatuses: string[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleCategory: (category: string) => void;
  handleStatus: (status: string) => void;
  resetFilters: () => void
};


function Header({ 
  loggedInUser, 
  filters, 
  handleCategory, 
  handleStatus, 
  allCategories, 
  allStatuses, 
  searchQuery, 
  setSearchQuery,
  resetFilters

}: HeaderProps ) {
    return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/src/assets/images/logo.jpg"><img className="logo" src="/src/assets/images/logo.jpg" alt="logo" />
            <div>Give and Take</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            
              <Link className="nav-link" to="/">Home</Link>
              <NavDropdown title="Sort by:" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Date</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Status</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Show All Articles</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Filter by:" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <FilterAccordion 
                    title="Categories" 
                    selectedFilters={filters.category}
                    filters={allCategories}
                    handler={handleCategory}
                
                  />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <FilterAccordion 
                    title="Status" 
                    selectedFilters={filters.status}
                    filters={allStatuses}
                    handler={handleStatus}
                  />
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={resetFilters}>Show All</NavDropdown.Item>
              </NavDropdown>
              {loggedInUser ? (
                <Link className="nav-link" to="/add-article">Post New Article</Link>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
              <Link className="nav-link" to="/about">About</Link>
            </Nav>
            <div className='language-button'>Choose Language</div>
            <LanguageSelector />
            <Form.Group className="mb-3" controlId="searchQuery">
                <Form.Label className="visually-hidden">Search</Form.Label>
                <Form.Control
                    type="search"
                    title="Search article description or who (username) you are looking for..."
                    placeholder="&#128269; Search article description or who (username) you are looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default Header