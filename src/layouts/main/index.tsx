import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import { Header } from "components/sections";
import { Loader } from "components/ui";

export const MainLayout = () => (
  <>
    <div className="wrapper">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  </>
);
