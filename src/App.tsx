import { useEffect } from "react";

import { AccessService } from "services/access.service";

import { Router } from "./components/common";

export const App = () => {
  const getToken = async () => {
    const { token } = await AccessService.getToken().then((response) => response.json());

    localStorage.setItem("token", JSON.stringify(token));
  };

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");

    if (!tokenInLocalStorage) {
      getToken();
    }
  }, []);

  return <Router />;
};
