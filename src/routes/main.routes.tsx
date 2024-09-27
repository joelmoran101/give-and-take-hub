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
import DeleteAccount from "../components/DeleteAccount";
import ArticleProvider from "../context/article.context";
import { AuthProvider } from "../auth/AuthContext";
// import Profile from "../components/ViewProfile";

export const router=createBrowserRouter(createRoutesFromElements(

        <Route element={
            <AuthProvider>
                <ArticleProvider>
                    <App />
                </ArticleProvider>
            </AuthProvider>
        } >

            <Route path="/" element={ <Home/> } />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/enter-one-time-password" element={<EnterOneTimePassword />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/browse" element={<BrowseItems />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/delete-account" element={<DeleteAccount />} />

        </Route>
   
))

