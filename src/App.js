import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//rutas
import Home from './pages/Home';
import Naves from './pages/Naves';

//importe del context
import NaveState from './context/naves/naveState'
import Footer from './components/layout/Footer';


function App() {
  return (
    <NaveState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/naves/:id' element={<Naves />} />
        </Routes>
        <Footer/>
      </Router>
    </NaveState>
  );
}

export default App;
