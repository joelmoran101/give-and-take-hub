import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;  
  profilePic: string;
  phone: string;
}

interface IAuthContext {
  loggedInUser: User | null;
  setLoggedInUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  loggedInUser: null,
  setLoggedInUser: () => {},
  logout: () => {},
});

const protectedRoutes = [
  "/delete-account" ,
  "/edit-user-profile",
  "/profile",
  "/add-article",
  "/edit-article/:articleId",
  "/delete-article/:articleId",
  "/reply-to-post/:articleId",
  "/edit-article",
  "/delete-article",
  "/reply-to-post",
]
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    console.log("DEBUG: CHECKING IF USER IS LOGGED IN")
    const token = localStorage.getItem("access_token");
    axios.get(import.meta.env.VITE_BACKEND_HOST+'/who-is-loggedin-user', {headers: { "authorization": `Bearer ${token}` }})
      .then((response: any) => {
        console.log("RESPONSE:::", response.data)
        setLoggedInUser(response.data.user);
        console.log("loggedInUser after setting:", response.data.user); // New console.log
        localStorage.setItem('access_token', response.data.token);
      })
      .catch((error: any) => {
        console.error("Error fetching logged-in user:", error); // New console.log
        setLoggedInUser(null);
        localStorage.clear();

        const isProtectedRoute = protectedRoutes.some(route => matchPath(route, location.pathname))

        if (isProtectedRoute) {
          navigate('/login');
        }

      })
  }, []);

  useEffect(() => {
    console.log("USER LOGGED IN:::", loggedInUser)
  }, [loggedInUser]);

  const logout = () => {
    setLoggedInUser(null)
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthProvider, AuthContext };