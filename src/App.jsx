import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Competitions from './pages/Competitions';
import Training from './pages/Training';
import Sales from './pages/Sales';
import Lessons from './pages/Lessons';
import Contact from './pages/Contact';
import OurHorses from './pages/OurHorses';
import HorseDetails from './pages/HorseDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tavlingar" element={<Competitions />} />
          <Route path="/inridning" element={<Training />} />
          <Route path="/forsaljning" element={<Sales />} />
          <Route path="/traningar" element={<Lessons />} />
          <Route path="/vara-hastar" element={<OurHorses />} />
          <Route path="/vara-hastar/:slug" element={<HorseDetails />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
