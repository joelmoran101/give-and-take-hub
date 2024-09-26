import { Accordion, Button, Container, Dropdown, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Filter } from "./BrowseItems";
import LanguageSelector from "../utilities/LanguageSelector";


function FilterAccordion({ title, items, filterCriteria, setFilterCriteria }: {
    title: string;
    items: { key: keyof Filter; label: string }[];
    filterCriteria: Filter;
    setFilterCriteria: React.Dispatch<React.SetStateAction<Filter>>;
  }) {
    return (
      <Dropdown>
        <Accordion onClick={e => e.stopPropagation()}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              {items.map(item => (
                <Dropdown.Item 
                  key={item.key}
                  className={filterCriteria[item.key] ? 'active-filter': ''}
                  onClick={() => setFilterCriteria(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Dropdown>
    );
  }

function Header({ loggedInUser, filterCriteria, setFilterCriteria, searchQuery, setSearchQuery }: {
    loggedInUser: any;
    filterCriteria: Filter;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setFilterCriteria: React.Dispatch<React.SetStateAction<Filter>>;
  }) {
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
                <NavDropdown.Item>
                  <FilterAccordion 
                    title="Categories" 
                    items={[
                      { key: 'furnitures', label: 'Furnitures' },
                      { key: 'toys', label: 'Toys' },
                      { key: 'clothes', label: 'Clothes' },
                      { key: 'elec_gadgets', label: 'Electric Gadgets' },
                    ]}
                    filterCriteria={filterCriteria}
                    setFilterCriteria={setFilterCriteria}
                  />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <FilterAccordion 
                    title="Status" 
                    items={[
                      { key: 'available', label: 'Available' },
                      { key: 'reserved', label: 'Reserved' },
                      { key: 'needed', label: 'Needed' },
                      { key: 'already_taken', label: 'Already Taken' },
                    ]}
                    filterCriteria={filterCriteria}
                    setFilterCriteria={setFilterCriteria}
                  />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Show All</NavDropdown.Item>
              </NavDropdown>
              {loggedInUser ? (
                <Nav.Link href="/add-article">Post New Article</Nav.Link>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )}
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <div className='language-button'>Choose Language</div>
            <LanguageSelector />
            <Form className="d-flex">
              <Form.Control onChange={ e => setSearchQuery(e.target.value) }
                value={searchQuery}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="search"
              />
              <Button variant="outline-success" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default Header