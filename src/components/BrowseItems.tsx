import React, { useEffect, useState } from 'react';
import ArticleCard from './articleCard/ArticleCard';
import { Navbar, Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';

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
const data = [{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e3"
  },
  "article_id": 1,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=a5369b4994b2d77aa6eaefbff020ed85",
  "article_name": "Bluetooth Headphones",
  "article_category": "Electronic Gadgets",
  "article_description": "Over-ear wireless Bluetooth headphones with noise cancellation.",
  "username": "techie123",
  "date_time_stamp": "2024-09-12T14:30:00Z",
  "availability": "available",
  "location": "New York, NY"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e4"
  },
  "article_id": 2,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=7d0cf62ea9b8f351e08beecb8ffa8b45",
  "article_name": "Wooden Coffee Table",
  "article_category": "Furniture",
  "article_description": "Solid oak coffee table with a classic design.",
  "username": "homeowner98",
  "date_time_stamp": "2024-09-10T08:45:00Z",
  "availability": "reserved",
  "location": "Los Angeles, CA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e5"
  },
  "article_id": 3,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=bf35e8fa4ac5b31d32b96b452e15be53",
  "article_name": "Children's Puzzle Set",
  "article_category": "Toys",
  "article_description": "Colorful puzzle set for kids aged 3-5.",
  "username": "mommy2020",
  "date_time_stamp": "2024-09-11T11:20:00Z",
  "availability": "available",
  "location": "Chicago, IL"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e6"
  },
  "article_id": 4,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=6ad5122a7ade579c3cec26387b06113f",
  "article_name": "Leather Jacket",
  "article_category": "Clothes",
  "article_description": "Black leather jacket, size M.",
  "username": "fashionista89",
  "date_time_stamp": "2024-09-09T16:00:00Z",
  "availability": "needed",
  "location": "San Francisco, CA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e7"
  },
  "article_id": 5,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=95b74dfd59ac87577fc7bd8de54d6e16",
  "article_name": "Camping Tent",
  "article_category": "Outdoor Gear",
  "article_description": "4-person camping tent with waterproof cover.",
  "username": "outdoorlover",
  "date_time_stamp": "2024-09-08T19:00:00Z",
  "availability": "already taken",
  "location": "Seattle, WA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e8"
  },
  "article_id": 6,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=94049e9847c91b2fd17d97b5caa825df",
  "article_name": "Electric Drill",
  "article_category": "Tools",
  "article_description": "Cordless electric drill with 2 batteries.",
  "username": "handyman101",
  "date_time_stamp": "2024-09-12T10:10:00Z",
  "availability": "available",
  "location": "Austin, TX"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671e9"
  },
  "article_id": 7,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=c9cf33c1f8293df28d5497a491467636",
  "article_name": "Novelty Lamp",
  "article_category": "Home Decor",
  "article_description": "Retro novelty lamp with adjustable brightness.",
  "username": "interiordecor",
  "date_time_stamp": "2024-09-11T15:30:00Z",
  "availability": "reserved",
  "location": "Miami, FL"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671ea"
  },
  "article_id": 8,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=8c6497073c5f7932735c09c7eb51cd10",
  "article_name": "Gaming Console",
  "article_category": "Electronic Gadgets",
  "article_description": "Latest model gaming console with 2 controllers.",
  "username": "gamer4life",
  "date_time_stamp": "2024-09-13T09:00:00Z",
  "availability": "available",
  "location": "Philadelphia, PA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671eb"
  },
  "article_id": 9,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=0763d4a1e52e9b051b806975d13bf9b0",
  "article_name": "Winter Coat",
  "article_category": "Clothes",
  "article_description": "Heavy-duty winter coat, size L.",
  "username": "coldweatherwear",
  "date_time_stamp": "2024-09-10T12:00:00Z",
  "availability": "needed",
  "location": "Boston, MA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671ec"
  },
  "article_id": 10,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=28b2b245df6d1d4988c75a61ddba434b",
  "article_name": "Yoga Mat",
  "article_category": "Fitness Gear",
  "article_description": "Non-slip yoga mat with carrying strap.",
  "username": "fitfam",
  "date_time_stamp": "2024-09-08T13:45:00Z",
  "availability": "already taken",
  "location": "Denver, CO"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671ed"
  },
  "article_id": 11,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=b5552b27c33c22fec34b301baf3b6381",
  "article_name": "Wristwatch",
  "article_category": "Accessories",
  "article_description": "Analog wristwatch with leather strap.",
  "username": "watchlover",
  "date_time_stamp": "2024-09-13T17:00:00Z",
  "availability": "available",
  "location": "San Diego, CA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671ee"
  },
  "article_id": 12,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=3ddff03d155324025280dd08f2e58863",
  "article_name": "Portable Blender",
  "article_category": "Kitchen Appliances",
  "article_description": "Battery-operated portable blender for smoothies.",
  "username": "healthydrinks",
  "date_time_stamp": "2024-09-09T14:15:00Z",
  "availability": "reserved",
  "location": "Atlanta, GA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671ef"
  },
  "article_id": 13,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=54b3bdb6848c9ee86cb759099675f950",
  "article_name": "Table Lamp",
  "article_category": "Home Decor",
  "article_description": "Modern table lamp with adjustable shade.",
  "username": "decorator123",
  "date_time_stamp": "2024-09-11T20:00:00Z",
  "availability": "needed",
  "location": "Seattle, WA"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671f0"
  },
  "article_id": 14,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=1773d5961ed11ec228594d54e3f03cf0",
  "article_name": "Set of Cookware",
  "article_category": "Kitchen Items",
  "article_description": "Non-stick cookware set including pots and pans.",
  "username": "chef2be",
  "date_time_stamp": "2024-09-10T11:30:00Z",
  "availability": "available",
  "location": "Houston, TX"
},
{
  "_id": {
    "$oid": "66e4019a244ca7471f5671f1"
  },
  "article_id": 15,
  "picture_url": "https://console.cloudinary.com/pm/c-94873cdeae15f87eb6d8c80f9d0f92/media-explorer/Give%20and%20Take%20Article%20Images?assetId=027fb65dc39c83e1b1f3b6adc89dd716",
  "article_name": "Office Chair",
  "article_category": "Furniture",
  "article_description": "Ergonomic office chair with lumbar support.",
  "username": "workspaceguru",
  "date_time_stamp": "2024-09-12T09:45:00Z",
  "availability": "already taken",
  "location": "Charlotte, NC"
}]
// Main BrowseItems component
function BrowseItems() {
  const [isPending, setIsPending] = useState(false)
  const [articles, setArticles] = useState <any>(data)
  const [errors, setErrors] = useState(null)

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



  return (
    <div>
      <header className='optionHeaders'>
        {renderHeader()}        
      </header>

      <div className="article-cards">
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
}

export default BrowseItems;