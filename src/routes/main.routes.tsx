import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import Hero from "../components/hero/Hero";
import Register from "../pages/Register";
import Login from "../pages/Login";
// import ViewProfile from "../components/ViewProfile";
import BrowseItems from "../components/BrowseItems";
import ReplyToPost from "../components/ReplyToPost";
import EnterOneTimePassword from "../pages/EnterOneTimePassword";
import AddArticle from "../components/articleCard/AddArticle";
import About from "../pages/About";
import DeleteAccount from "../components/userProfile/DeleteAccount";
import ArticleProvider from "../context/article.context";
import { AuthProvider } from "../auth/AuthContext";
import UserProfile from "../components/userProfile/UserProfile";
import Logout from "../components/Logout";
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
            <Route path="/logout" element={<Logout />} />
            <Route path="/enter-one-time-password" element={<EnterOneTimePassword />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/browse" element={<BrowseItems />} />
            <Route path="/reply-to-post/:articleId" element={<ReplyToPost />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/delete-account" element={<DeleteAccount />} />

        </Route>
   
))

