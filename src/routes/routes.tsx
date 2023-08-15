import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Form from "../pages/Form";
import List from "../pages/List";
import NotFound from "../pages/NotFound";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/form" element={<Form />} />
          <Route index element={<List />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
