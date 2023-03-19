import { useEffect } from "react";

import { AccessService } from "services/access.service";

import { Router } from "./components/common";

export const App = () => {
  const getToken = async () => {
    try {
      const { token } = await AccessService.getToken().then((response) => response.json());

      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");

    if (!tokenInLocalStorage) {
      getToken();
    }
  }, []);

  return <Router />;
};
