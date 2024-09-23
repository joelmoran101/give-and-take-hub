import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import Hero from "../components/hero/Hero";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BrowseItems from "../components/BrowseItems";
import EnterOneTimePassword from "../pages/EnterOneTimePassword";
import AddArticle from "../components/AddArticle";
import About from "../pages/About";

export const router=createBrowserRouter(createRoutesFromElements(

        <Route element={<App />} >
            <Route path="/" element={ <Home/> } />
            {/* <Route path="/welcome" element={<Hero />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/enter-one-time-password" element={<EnterOneTimePassword />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/browse" element={<BrowseItems />} />

        </Route>
   
))

