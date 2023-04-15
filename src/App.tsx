import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audio from './Components/SearchMusic/Audio';
import SearchMusic from './pages/SearchMusic';
import './App.css';
import './ComponentsCSS/Mobile/MenuMobile.css';
import './ComponentsCSS/Responsive/main.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { Context } from './Context/AuthContext';
import Menu from './Components/Menus/Menu';
import Favorites from './pages/Favorites';
import Library from './pages/Library';
import HeaderMobile from './Components/Menus/HeaderMobile';
import MenuMobile from './Components/Menus/MenuMobile';

function App() {

  const { isAuthenticated } = useContext(Context);

  return (
    <div className='container_app'>
      <div>
        {isAuthenticated && <Menu />}
        {isAuthenticated && <HeaderMobile />}
      </div>
      <div>
        <Routes>
          <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
          <Route path='/search' element={isAuthenticated ? <SearchMusic /> : <Login />} />
          <Route path='/favorites' element={isAuthenticated ? <Favorites /> : <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/library' element={<Library />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={isAuthenticated ? <Home /> : <Login />} />

        </Routes>
      </div>
      {isAuthenticated ? <Audio /> : <span></span>}
      {isAuthenticated ? <MenuMobile /> : <span></span>}
    </div>
  );
}

export default App;
