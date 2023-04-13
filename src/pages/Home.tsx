import React, { useContext } from 'react'
import { Context } from '../Context/AuthContext';
import '../ComponentsCSS/Home.css'

const Home = () => {

  const { recentTracks } = useContext(Context);

  return (
    <div className='container_home'>
      <header>
        <h1>Tocadas Recentemente</h1>
      </header>
      <section className='container_recents'>
        {Array.isArray(recentTracks) ? (
          recentTracks.map((music) => (
            <div className='container_recentsMap'>
              <div>
                <img src={music.album} alt="Album cover" />
              </div>
              <div>
                <p>{music.name}</p>
                <p>{music.artists}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma musica recente</p>
        )}

      </section>
    </div>
  )
}

export default Home