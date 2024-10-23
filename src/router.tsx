import { createBrowserRouter, Outlet } from "react-router-dom";

import { pageRoutes } from "@/apiRoutes";
import { Layout } from "./pages/common/components/Layout";
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
import { authStatusType } from "./pages/common/components/Layout";

// 현재 상태
// 구매자 : 정상적으로 작동, 판매 관리 페이지 접근 불가, 구매 관리 페이지 접근 가능
// 판매자 : 에러, 판매관리 페이지 못감, 구매페이지 접근하면 구매 관리 페이지 잠깐 보이고 판매자 페이지로 이동
// useAuthStore에서 판매자, 구매자 로그인시 isSeller 값 ture, false로 잘 출력됨

// 로그인한 사용자에게 공통적으로 적용되는 레이아웃
const ProtectedLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Layout authStatus={authStatusType.NEED_LOGIN}>
        <Outlet />
      </Layout>
    </RootSuspense>
  </RootErrorBoundary>
);

// 판매자만 접근 가능한 레이아웃
const SellerProtectedLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Layout authStatus={authStatusType.NEED_SELLER}>
        <Outlet />
      </Layout>
    </RootSuspense>
  </RootErrorBoundary>
);

// 구매자만 접근 가능한 레이아웃
const BuyerProtectedLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Layout authStatus={authStatusType.NEED_BUYER}>
        <Outlet />
      </Layout>
    </RootSuspense>
  </RootErrorBoundary>
);

// 비로그인 사용자용 레이아웃
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
        path: pageRoutes.purchase,
        element: <Purchase />,
        errorElement: <ErrorPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <SellerProtectedLayout />, // 판매자 전용 페이지
    children: [
      {
        path: pageRoutes.productManageMent,
        element: <ProductManageMent />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    element: <BuyerProtectedLayout />, // 구매자 전용 페이지
    children: [
      {
        path: pageRoutes.purchaseHistory,
        element: <PurchaseHistory />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    element: <PublicLayout />, // 비로그인 사용자
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
