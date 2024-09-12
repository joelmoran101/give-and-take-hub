// src/AuthContext.

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';



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

  

  useEffect (() => {
    const token = localStorage.getItem("access_token");
     axios.get('/api/who-is-loggedin-user', {headers: { "authorization": `Bearer ${token}` }})
     .then((response: any) => {
      setLoggedInUser(response.data.user);
    })
    .catch((error: any) => {
      setLoggedInUser(null);
      localStorage.clear();
      window.location.replace("/login");
    })
  }, []);

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext,  };