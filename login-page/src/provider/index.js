import { createContext, useEffect, useState } from "react";

export const MainCtx = createContext({});

const MainProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [auth]);

  const MainContext = {
    auth,
    setAuth,
  };

  return <MainCtx.Provider value={MainContext}>{children}</MainCtx.Provider>;
};

export default MainProvider;
