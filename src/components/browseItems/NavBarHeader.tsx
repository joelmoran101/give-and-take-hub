import { Accordion, Button, Container, Dropdown, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Filter } from "./BrowseItems";
import LanguageSelector from "../../utilities/LanguageSelector";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.jpg";

function FilterAccordion({ title, filters, handler, selectedFilters }: {
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

type SortOption = 'username' | 'category' | 'status' | 'date';
type HeaderProps = {
  filters: Filter;
  allCategories: string[];
  allStatuses: string[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleCategory: (category: string) => void;
  handleStatus: (status: string) => void;
  resetFilters: () => void;
  handleSort: (sortBy: SortOption) => void;
  currentSort: SortOption;
};

function Header({ 
  filters, 
  handleCategory, 
  handleStatus, 
  allCategories, 
  allStatuses, 
  searchQuery, 
  setSearchQuery,
  resetFilters,
  handleSort,
  currentSort
}: HeaderProps ) {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSortChange = (sortOption: SortOption) => {
    handleSort(sortOption);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <img 
            className="logo" 
            src={logo}
            alt="logo" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <div 
            onClick={() => navigate('/browse')}
            style={{ cursor: 'pointer' }}
          >
            Give and Take
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="nav-link" to="/">{t('Home')}</Link>

            <NavDropdown title={t('Filter by')} id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <FilterAccordion 
                  title={t('Categories')} 
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
              <NavDropdown.Item onClick={resetFilters}>{t('Show All')}</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={`${t('Sort by')}: ${t(currentSort)}`} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => handleSortChange('username')}>{t('sort by username')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSortChange('category')}>{t('sort by category')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSortChange('status')}>{t('sort by status')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSortChange('date')}>{t('sort by date')}</NavDropdown.Item>
            </NavDropdown>

            

            {loggedInUser ? (
              <>
                <Link className="nav-link" to="/add-article">{t('Post New Article')}</Link>
                <Link className="nav-link" to="/profile">{t('Profile')}</Link>
                <Link className="nav-link" to="/logout">{t('Logout')}</Link>
              </>
            ) : (
              <Link className="nav-link" to="/login">{t('Login')}</Link>
            )}
            <Link className="nav-link" to="/about">{t('About')}</Link>
          </Nav>
          <div className='language-button'>{t('Choose Language')}</div>
          <LanguageSelector />
          <Form.Group className="mb-3" controlId="searchQuery">
            <Form.Label className="visually-hidden">{t('Search')}</Form.Label>
            <Form.Control
              type="search"
              title={t('Search')}
              placeholder= {"🔍 " + t('Search Articles')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;