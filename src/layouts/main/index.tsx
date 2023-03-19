import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
  </>
);
