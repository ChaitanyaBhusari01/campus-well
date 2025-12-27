import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);

      setToken(storedToken);
      setUser({
        userId: decoded.userId,
        role: decoded.role,
        refId: decoded.refId,
      });
    }
      setLoading(false);
    },[]);

  const login=(token)=>{
    localStorage.setItem("token" , token);
    setToken(token);
    const decoded = jwtDecode(token);
    setUser({userId : decoded.userId, role : decoded.role, refId : decoded.refId});
  };

  const logout = () =>{
    localStorage.removeItem("token");
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

export function useAuth() {
    return useContext(AuthContext);
} 