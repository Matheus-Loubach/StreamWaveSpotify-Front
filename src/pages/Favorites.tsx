import { useContext } from 'react'
import { Context } from '../Context/AuthContext';

const Favorites = () => {

    const { favoriteList } = useContext(Context);

    return (
        <div className='container_home'>
            <header>
                <h1>Músicas Favoritas</h1>
            </header>
            <section className='container_recents'>
                {Array.isArray(favoriteList) && favoriteList.length > 0 ?
                    favoriteList.map((music) => (
                        <div className='container_recentsMap'>
                            <div>
                                <img src={music.album} alt="Album cover" />
                            </div>
                            <div>
                                <p>{music.name}</p>
                                <p>{music.artists}</p>
                            </div>
                        </div>
                    )) :
                    <p>Nenhuma música nos favoritos</p>
                }
            </section>

        </div>
    )
}

export default Favorites