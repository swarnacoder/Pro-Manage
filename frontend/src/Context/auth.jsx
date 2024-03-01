import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  //Logout User
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // Authentication & get USER DATA FOR SETTINGS
  const userAuthentication = async () => {
    try {
      const response = await fetch("https://swarnapprava5426-gmail-com-cuvette-final-ea3b.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User Data: ", data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.log("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    userAuthentication();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }

  return authContextValue;
};
