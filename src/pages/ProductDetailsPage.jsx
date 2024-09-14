import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
const ProductDetails = lazy(() => import("../components/ProductDetails"));

//
const ProductDetailsPage = () => {
  //
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetails />
    </Suspense>
  );
};

export default ProductDetailsPage;
