import { useContext } from 'react'
import { Context } from '../Context/AuthContext'

const Library = () => {


    const { favoriteList, recentTracks } = useContext(Context);

    return (
        <div>

            <div className='container_home'>
                <header>
                    <h1>Musicas Favoritas</h1>
                </header>
                <section className='container_recents'>
                    {favoriteList ? favoriteList.map((music: any) => (
                        <div className='container_recentsMap'>
                            <div>
                                <img src={music.album} alt="Album cover" />
                            </div>
                            <div>
                                <p>{music.name}</p>
                                <p>{music.artists}</p>
                            </div>
                        </div>
                    )) : <p>Nenhuma musica recente</p>}
                </section>
            </div>
            <div className='container_home'>
                <header>
                    <h1>Tocadas Recentemente</h1>
                </header>
                <section className='container_recents'>
                    {recentTracks ? recentTracks.map((music: any) => (
                        <div className='container_recentsMap'>
                            <div>
                                <img src={music.album} alt="Album cover" />
                            </div>
                            <div>
                                <p>{music.name}</p>
                                <p>{music.artists}</p>
                            </div>
                        </div>
                    )) : <p>Nenhuma musica recente</p>}
                </section>
            </div>
        </div>
    )
}

export default Library