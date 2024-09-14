import { Suspense } from "react";
import Loading from "../components/Loading";
import ProductEdit from "../components/ProductEdit";
// 
const ProductEditPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductEdit />
    </Suspense>
  );
};

export default ProductEditPage;
