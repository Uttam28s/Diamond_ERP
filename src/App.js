import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes/route";
import NotFound from "./Pages/NotFound";
import './index.css'
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import Rough from "./Pages/Rough/Rough";
import Dashboard from "./Pages/HomePage/Dashboard";
import Login from "./Pages/Login/Login";
import Factory from "./Pages/Factory/Factory";
import Office from "./Pages/Office/Office";
import AddRough from "./Pages/Rough/AddRough";
import 'animate.css';
import Layout from "./PageComponent/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path={routes.rough} element={<Rough />} />
          <Route path={routes.addRough} element={<AddRough />} />
          <Route path={routes.factory} element={<Factory />} />
          <Route path={routes.office} element={<Office />} />
          <Route path={routes.homePage} element={<Dashboard />} />
          <Route path={routes.addProducts} element={<AddProduct />} />
          <Route path={routes.products} element={<ProductList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
