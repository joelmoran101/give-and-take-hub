import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Hero from "../components/hero/Hero";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GiveItem from "../components/GiveItem";
import SearchItems from "../components/SearchItems";

export const router=createBrowserRouter(createRoutesFromElements(

        <Route element={<App />} >
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/give" element={<GiveItem />} />
            <Route path="/search" element={<SearchItems />} />
        </Route>
   
))

