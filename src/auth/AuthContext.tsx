// src/AuthContext.

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_HOST } from '../config/config';
import { useNavigate } from 'react-router-dom';



type User = {
  userId: string;
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

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();
  

  useEffect (() => {
    console.log("DEBUG: CHECKING IF USER IS LOGGED IN")
    const token = localStorage.getItem("access_token");
     axios.get(BACKEND_HOST+'/api/who-is-loggedin-user', {headers: { "authorization": `Bearer ${token}` }})
     .then((response: any) => {
      console.log("RESPONSE:::", response.data)
      setLoggedInUser(response.data.user);
      localStorage.setItem('token', response.data.token); // Store token in local storage
    })
    .catch((error: any) => {
      setLoggedInUser(null);
      localStorage.clear();
      navigate("/login");
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

export { AuthProvider, AuthContext,  };