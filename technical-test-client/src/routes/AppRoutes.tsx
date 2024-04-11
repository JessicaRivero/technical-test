import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home/Home';
import SearchResults from '../views/SearchResult/SearchResult';
import ProductDetail from '../views/ProductDetail/ProductDetail';
import NotFound from '../components/NotFound/NotFound';
import Error from '../components/Error/Error';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/items" element={<SearchResults />} />
    <Route path="/items/:id" element={<ProductDetail />} />
    <Route path="/error" element={<Error message="Se produjo un error al cargar los detalles del producto. Vuelva al inicio e intentelo más tarde."></Error>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
