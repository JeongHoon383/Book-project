import { createBrowserRouter } from "react-router-dom";

import { pageRoutes } from "./apiRoutes";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ProductDetail } from "./pages/productDetail";
import { ProductManageMent } from "./pages/productManagement";
import { Purchase } from "./pages/purchase";
import { PurchaseHistory } from "./pages/purchaseHistory";
import { ErrorPage } from "./pages/error/ErrorPage";
import { NotFoundPage } from "./pages/error/NotFoundPage";
import { Navbar } from "./layout/Navbar";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },
      {
        path: pageRoutes.login,
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.register,
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productDetail,
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productManageMent,
        element: <ProductManageMent />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: <Purchase />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistory />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
