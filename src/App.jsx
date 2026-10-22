import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext';
import Home from './Home'; 
import Favorites from './Favotitas';
import About from './About';
import { Detail } from './components/Detail';

const App = () => {
  return (
    <Router>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/coin/:id" element={<Detail />} />
        </Routes>
      </FavoritesProvider>
    </Router>
  );
};

export default App;