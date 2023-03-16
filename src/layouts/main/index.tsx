import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import { Loader } from "components/ui";

export const MainLayout = () => (
  <>
    <div className="wrapper">
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  </>
);
