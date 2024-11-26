import { createBrowserRouter, Outlet } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { ProductDetail } from "@/pages/productDetail";
import { ProductManageMent } from "./pages/productManagement";
import { Purchase } from "@/pages/purchase";
import { PurchaseHistory } from "@/pages/purchaseHistory";
import { ErrorPage } from "@/pages/error/components/ErrorPage";
import { NotFoundPage } from "@/pages/error/components/NotFoundPage";
import { RootErrorBoundary } from "@/pages/common/components/RootErrorHandler";
import { RootSuspense } from "@/pages/common/components/RootSuspense";

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> }, // NEED_LOGIN
      {
        path: pageRoutes.register, // NEED_NOT_LOGIN
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login, // NEED_NOT_LOGIN
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: `${pageRoutes.productDetail}/:id`, // NEED_LOGIN
        element: <ProductDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase, // NEED_BUYER
        element: <Purchase />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistory />, // NEED_BUYER
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.productManageMent, // NEED_SELLER
        element: <ProductManageMent />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
