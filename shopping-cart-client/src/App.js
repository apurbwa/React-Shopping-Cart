import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import { CardProvider } from './CartContext';

function App() {
  return (
    <CardProvider>
      <Container>
        <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CardProvider>
  );
}

export default App;
