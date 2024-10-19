import { createBrowserRouter, Outlet } from "react-router-dom";

import { pageRoutes } from "@/apiRoutes";
import { Layout } from "./pages/common/components/Layout";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { ProductDetail } from "@/pages/productDetail";
import { ProductManageMent } from "@/pages/productManagement";
import { Purchase } from "@/pages/purchase";
import { PurchaseHistory } from "@/pages/purchaseHistory";
import { ErrorPage } from "@/pages/error/components/ErrorPage";
import { NotFoundPage } from "@/pages/error/components/NotFoundPage";
import { RootErrorBoundary } from "@/pages/common/components/RootErrorHandler";
import { RootSuspense } from "@/pages/common/components/RootSuspense";
import { authStatusType } from "./pages/common/components/Layout";

// 로그인 비로그인은 됨
// 구매자, 관리자 다시 나눠야함

const ProtectedLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Layout authStatus={authStatusType.NEED_LOGIN}>
        <Outlet />
      </Layout>
    </RootSuspense>
  </RootErrorBoundary>
);

const PublicLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
        <Outlet />
      </Layout>
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ProtectedLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },
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
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistory />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: <Purchase />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
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
    ],
  },
]);

export default router;
