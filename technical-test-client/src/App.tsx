import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import FundProduct from './components/FundProduct/FundProduct';

function App() {
  return (
    <Router>
        <FundProduct>
            <AppRoutes />
        </FundProduct>
    </Router>
  );
}

export default App;