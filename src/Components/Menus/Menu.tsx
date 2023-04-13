import { useContext } from 'react'
import '../../ComponentsCSS/Menu.css'
import { AiTwotoneHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { SiApplemusic } from "react-icons/si";
import { NavLink } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

const Menu = () => {

    const style = { width: '25px', height: '25px', marginRight: '10px', paddingTop: '10px' };
    const { profile, handleLoggout } = useContext(Context);



    return (
        <div id='RemoveForMobile'>
            <header className="container_profile">
                <div id='title'>
                <h1>Stream Waver</h1>
                </div>
                <div className='profile_user'>
                    <p>@{profile?.name}</p>
                    <p onClick={handleLoggout}>Sair</p>
                </div>
            </header>
            <div className='container_menu'>
                <header>
                    <nav>
                        <div>
                            <ul>
                                <div>
                                    <AiTwotoneHome style={style} />
                                    <NavLink activeclassName="active" to='/'><li>início</li></NavLink>
                                </div>
                                <div>
                                    <AiOutlineSearch style={style} />
                                    <NavLink activeclassName="active" to='/search'><li>Buscar</li></NavLink>
                                </div>
                                <div>
                                    <SiApplemusic style={style} />
                                    <NavLink activeclassName="active" to='/library'><li>Sua Biblioteca</li></NavLink>
                                </div>
                            </ul>
                            <ul>
                                <div>
                                    <NavLink activeclassName="active" to='/favorites'><li>Músicas Favoritas</li></NavLink>
                                </div>
                            </ul>
                            <hr />
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}

export default Menu