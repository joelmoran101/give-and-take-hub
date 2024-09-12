import React, { useEffect } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Dropdown, Navbar, Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';

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

//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="#">Navbar</a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <a className="nav-link active" aria-current="page" href="#">Home</a>
//         </li>
//         <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Sort by: Dropdown
//           </a>
//           <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//             <li><a className="dropdown-item" href="#">Available Articles</a></li>
//             <li><a className="dropdown-item" href="#">Needed Items</a></li>
//             <li><hr/> className="dropdown-divider"</li>
//             <li><a className="dropdown-item" href="#">Show All Articles</a></li>
//           </ul>
//         </li>
//         <li className="nav-item dropdown">
//           <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Filter by: Dropdown
//           </a>
//           <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//             <li><a className="dropdown-item" href="#">Location</a></li>
//             <li><a className="dropdown-item" href="#">Category</a></li>
//             <li><hr/> className="dropdown-divider"</li>
//             <li><a className="dropdown-item" href="#">Show All</a></li>
//           </ul>
//         </li>
//       </ul>
//       <form className="d-flex">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
//   </div>
// </nav>


// function sortByDropdownOptions() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Sort By
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Available Articles</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Needed Items</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Show All Articles</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   )};
// function filterByDropdownOptions() {
//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         Filter By
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Location</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Show All</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   )};
function BrowseItems() {
  useEffect(() => {
    // axios.get
    
  }, [])

  return (
    <div>
      <header className='optionHeaders'>
        { renderHeader() }
        
      </header>

      <div className="article-cards">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}

export default BrowseItems;