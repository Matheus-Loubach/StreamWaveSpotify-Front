import React, { useContext, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import { Context } from '../../Context/AuthContext';

const MenuMobileBarra = () => {

  const { profile, handleLoggout } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const style = { width: '30px', height: '30px', marginRight: '10px', paddingTop: '10px' };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container_mobile'>
      <div className="menu-container">
        <p className="menu-toggle" onClick={toggleMenu}><CgProfile style={style} /></p>

        <ul className={isOpen ? 'menu-list open' : 'menu-list'}>
          <li>
            <p>{profile?.name}</p>
          </li>
          <li>
            <p onClick={() => handleLoggout()}>Sair</p>
          </li>
        </ul>
      </div>
      <header>
        <h1>Stream Wave</h1>
      </header>
    </div>
  )
}

export default MenuMobileBarra