import { createBrowserRouter, createRoutesFromElements, Link, Navigate, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Health from "../../src/components/Health";
import EnterOneTimePassword from "../pages/EnterOneTimePassword";
import Logout from "../components/logout/Logout";
import BrowseItems from "../components/browseItems/BrowseItems";
import ReplyToPost from "../components/replyToPost/ReplyToPost";
import AddArticle from "../components/articleCard/AddArticle";
import EditArticle from "../components/articleCard/EditArticle";
import DeleteArticle from "../components/articleCard/DeleteArticle";
import UserProfile from "../components/userProfile/UserProfile";
import DeleteAccount from "../components/userProfile/DeleteAccount";
import ArticleProvider from "../context/article.context";
import { AuthProvider } from "../context/auth/AuthContext";
import SimplifiedTerms from "../pages/Terms/SimplifiedTerms";
// import Terms from "../pages/Terms/terms";

export const router=createBrowserRouter(createRoutesFromElements(

        <Route element={
            <AuthProvider>
                <ArticleProvider>
                    <App />
                </ArticleProvider>
            </AuthProvider>
        } errorElement={<div>Error<Link to="/">Go Back</Link></div>} >
            //to be replaced by a 404 page later

            <Route path="/" element={ <Home/> } />
            <Route path="/health" element={ <Health/> } />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/enter-one-time-password" element={<EnterOneTimePassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/browse" element={<BrowseItems />} />
            <Route path="/reply-to-post/:articleId" element={<ReplyToPost />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:articleId" element={<EditArticle />} />
            <Route path="/delete-article/:articleId" element={<DeleteArticle />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-user-profile" element={<UserProfile />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
            <Route path="/terms-and-conditions" element={<SimplifiedTerms />} />
            

        </Route>
   
))

