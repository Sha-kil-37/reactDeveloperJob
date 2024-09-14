import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductEditPage from "./pages/ProductEditPage";
//
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/product-edit/:id" element={<ProductEditPage />} />
      </Route>
    </Routes>
  );
};

export default App;
