import { useState } from "react";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("username");
  });

  const setToken = (newToken) => {
    localStorage.setItem("username", newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
