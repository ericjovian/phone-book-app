import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../pages/Form";
import List from "../pages/List";
import NotFound from "../pages/NotFound";
import { Loading } from "../components/Loading";

const routes = () => {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/:id" element={<Form />} />
          <Route index element={<List />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
