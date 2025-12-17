import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
    },[]);

  const login=(user,token)=>{
    localStorage.setItem({"token" : token});
    localStorage.setItem({'user' : user});
    setToken(token);
    setUser(user);
  };

  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.setItem("user");
    setToken(null);
    setUser(null);
  }

  return(
    <AuthContext.Provider value = {{
        user,
        token,
        loading,
        login,
        logout,
    }}>
        {children}
    </AuthContext.Provider>
  )
}