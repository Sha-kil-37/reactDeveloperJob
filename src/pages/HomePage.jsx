import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
const Home = lazy(() => import("../layout/MainLayout"));
const HomePage = () => {
  //
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
