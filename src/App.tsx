import { Route, Routes } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { ProductDetail } from "./pages/productDetail";
import { ProductManageMent } from "./pages/productManagement";
import { Purchase } from "./pages/purchase";
import { PurchaseHistory } from "./pages/purchaseHistory";
import { Register } from "./pages/register";
import { NotFound } from "./pages/notFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/productManageMent" element={<ProductManageMent />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/purchaseHistory" element={<PurchaseHistory />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
