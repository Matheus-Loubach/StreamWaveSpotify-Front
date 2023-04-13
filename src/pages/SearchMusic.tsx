import { useContext } from 'react';
import '../ComponentsCSS/Search.css';
import LoadingSearch from '../Components/SearchMusic/LoadingSearch';
import LoadingBest from '../Components/SearchBest/LoadingBest';
import { Context } from '../Context/AuthContext';


const SearchMusic = () => {


  const { setCurrentTrack,  searchMusic, setMusicSearch, tracks, resultBest } = useContext(Context);

  //Enviar pesquisa da musica
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCurrentTrack(null);
  };

  return (
    <>
      <div className='container_search'>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="O que você quer ouvir?"
              value={searchMusic}
              onChange={(e) => setMusicSearch(e.target.value)}
            />
          </form>

          <main className='container_musicList'>
            <section>
              <div>
                {searchMusic && (
                  <div>
                    <LoadingBest resultBest={resultBest} />
                  </div>
                )}
              </div>
            </section>
            <section>
              {searchMusic && (
                <div>
                  <h1>Músicas</h1>
                  <LoadingSearch tracks={tracks}  />
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default SearchMusic;
