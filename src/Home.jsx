import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';

export const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addFavorite } = useFavorites();

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCoins();
    return () => controller.abort();
  }, []);

  const handleCoinClick = (id) => navigate(`/coin/${id}`);

  const handleAddFavorite = (e, coin) => {
    e.stopPropagation();
    addFavorite(coin);
    alert(`${coin.name} ha sido añadida a favoritas!`);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 bg-[#0f25e9] text-white hidden md:flex flex-col shadow-xl">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-2xl font-bold tracking-wide">CryptoApp</h2>
        </div>
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <Link to="/" className="flex items-center px-4 py-3 bg-blue-800 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Mercado
          </Link>
          <Link to="/about" className="flex items-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            About
          </Link>
          <Link to="/favoritos" className="flex items-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Favoritas
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-2 pb-4">Crypto Markets</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64"><p className="text-xl font-bold text-gray-500">Cargando...</p></div>
        ) : error ? (
          <div className="p-8 text-center"><p className="text-red-500 font-bold text-xl">Error: {error}</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {coins.map((coin) => (
              <div key={coin.id} onClick={() => handleCoinClick(coin.id)} className="border border-gray-200 shadow-md rounded-xl p-6 flex flex-col items-center bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <img src={coin.image} alt={coin.name} className="w-16 h-16 object-cover mb-4" />
                <h2 className="font-bold text-xl text-gray-800 text-center">{coin.name}</h2>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest my-1">{coin.symbol}</span>
                <p className="font-bold text-green-600 text-lg">${coin.current_price?.toLocaleString()}</p>
                <div className="mt-auto w-full pt-4">
                  <button onClick={(e) => handleAddFavorite(e, coin)} className="bg-[#0f25e9] text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full font-bold transition-colors shadow-sm">
                    Agregar a Favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;