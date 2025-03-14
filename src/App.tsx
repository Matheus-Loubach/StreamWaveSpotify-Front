import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audio from './Components/audioMusic/audio-music.view';
import './App.css';
import { Context } from './Context/AuthContext';
import Library from './pages/Library';
import Sidebar from './Components/Menus/Menu';
import SearchMusic from './pages/search/search.view';
import Login from './pages/auth/login/login.view';
import FavoritesPage from './pages/favorite/favorite.view';
import RegisterPage from './pages/auth/register/register.view';

function App() {

  const { isAuthenticated } = useContext(Context);

  return (
    <div className="min-h-screen min-w-screen flex">
      <div className="z-40 fixed w-64 h-full">
        {isAuthenticated && <Sidebar />}
      </div>
      <div className="">
        <Routes>
          <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
          <Route path='/search' element={isAuthenticated ? <SearchMusic /> : <Login />} />
          <Route path='/favorites' element={isAuthenticated ? <FavoritesPage /> : <Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/library' element={isAuthenticated ? <Library /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={isAuthenticated ? <Home /> : <Login />} />

        </Routes>
      </div>
      {isAuthenticated ? <Audio /> : []}
    </div>
  );
}

export default App;
