import { createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/config';
import { getTrack, register } from '../services/AuthService';
import { Track } from './TrackType'

const Context = createContext<any>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

type RegisterData = {
  name: string,
  email: string,
  password: string,
  passwordconf: string
}

const AuthContext = ({ children }: AuthContextProps) => {

  const tracksRef = useRef<Track[]>([]);
  const navigate = useNavigate();

  //ControleMenu
  const [menuOn, setMenuOn] = useState<boolean>(false);

  // Estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('auth') === 'true'
  );

  // Estados para armazenar o token do usuário e o id do usuário
  const [tokenUser, setTokenUser] = useState<string>(
    localStorage.getItem('token') || ''
  );
  const [idUser, setIdUser] = useState<string>(
    localStorage.getItem('idUser') || ''
  );


  // Estado para armazenar o token do Spotify
  const [tokenSpotify, setTokenSpotify] = useState<string | null>(null);
  // Estado para armazenar a lista de músicas favoritas
  const [favoriteList, setFavoriteList] = useState<Array<any>[]>([]);
  // Estado para armazenar as músicas tocadas recentemente
  const [recentTracks, setRecentTracks] = useState<string[]>([]);

  // Estado para armazenar as informações das músicas obtidas da busca
  const [tracks, setTracks] = useState<Track[]>([]);
  // Estado para armazenar a música mais popular/relevante obtida da busca
  const [resultBest, setResultBest] = useState<Track[]>([]);
  // Estado para armazenar a música selecionada
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Estado para armazenar a entrada de pesquisa do usuário
  const [searchMusic, setMusicSearch] = useState<string>('');
  // Estado para armazenar mensagens de erro/sucesso
  const [messagem, setMessagem] = useState<string>('');
  // Estado para armazenar informações do perfil do usuário
  const [profile, Setprofile] = useState<Record<string, unknown>>();


  // Lida com o login do usuário
  const handleLogin = async (data: { name: string, password: string }) => {

    try {
      const responseData = await fetch(api + '/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify(data),
      });
      const response = await responseData.json();
      if (response.token) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        setTokenUser(response.token);
        navigate("/");
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        setTokenUser("");
        navigate("/login");
      }
      setMessagem(response);
    } catch (error) {
      setMessagem("Ocorreu um erro ao fazer login!");
    }
  };

  //Verifica se o token do usuário é valido e se for retorna as info do perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(api + '/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        });
        const data = await response.json();
        console.log('algo', data);
        localStorage.setItem('idUser', data._id);
        setIdUser(data._id);
        Setprofile(data);
      } catch (error) {
        console.log(error, 'Usuario sem permissão');
      }
    };
    fetchProfile();
  }, [tokenUser]);

  // Lida com o registro do usuário
  const handleRegister = async (data: RegisterData) => {
    try {
      const response = await register(data);

      if (response) {
        setMessagem(response);
      }

    } catch (error: any) {
      setMessagem(`Ocorreu um erro ao registrar! ${error.message}`);
    }
  };


  // Verificar se o usuário já está autenticado
  useEffect(() => {
    const auth = localStorage.getItem('auth') === 'true';
    const storedToken = localStorage.getItem('token');
    if (auth && storedToken) {
      setIsAuthenticated(true);
      setTokenUser(storedToken);
    }
  }, []);

  // Lidar com a seleção de uma música
  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  // Enviar a música que foi tocada recentemente para o servidor
  const sendRecentMusic = async (name: string, album: string, artists: string, id: string) => {
    try {
      const response = await fetch(api + "/tracks/recent-tracks", {
        method: "POST",
        body: JSON.stringify({ userId: idUser, name: name, album: album, artists: artists, id: id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const responseData = await response.json();
      console.log('Música recente enviada com sucesso:', responseData);
    } catch (error: any) {
      console.log('Erro ao enviar música recente:', error);
    }
  };

  useEffect(() => {
    if (typeof currentTrack === "object" && currentTrack !== null) {
      const { name, album, artists, id } = currentTrack;
      sendRecentMusic(name, album.images[0].url, artists[0].name, id);
    }
  }, [currentTrack, searchMusic]);

  // Enviar a música favorita tocada para o servidor
  const handleFavorite = async (track: Track) => {
    const { name, album, artists, id } = track;

    try {
      const response = await fetch(api + "/favorite", {
        method: "POST",
        body: JSON.stringify({ userId: idUser, name: name, album: album.images[0].url, artists: artists[0].name, id: id }),
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          "Content-Type": "application/json"
        }
      });
      const responseData = await response.json();
      setMessagem(responseData.message);
    } catch (error) {
      console.log('Erro ao enviar música Favorita:', error);
    }
  };

  /* const handleDeleteFavorite = async (id) => {
     console.log('api?',id);
     try {
       const response = await fetch(api + "/users/delete/" + id, {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
         },
       });
       if (response.ok) {
         // Remover a música favorita da lista local de favoritos
         setFavoriteList(favoriteList.filter((music) => music.id !== id));
         
       } else {
         console.error('Erro ao remover música favorita');
       }
     } catch (error) {
       console.error(error);
     }
   }*/


  // Buscar as músicas que correspondem à entrada do usuário
  useEffect(() => {
    const handleTrack = async () => {
      try {
        const data = await getTrack(searchMusic);
        setTracks(data.searchResults.tracks.items);
        setTokenSpotify(data.accessToken);
        tracksRef.current = data.searchResults.tracks.items;
      } catch (error) {
        console.log('Erro ao buscar música:', error);
      }
    };

    handleTrack();

    const regex = new RegExp(searchMusic, 'i');
    const filteredTracks = tracksRef.current.filter((tracks) => regex.test(tracks.name));
    const sortedTracks = filteredTracks.sort((a, b) => b.popularity - a.popularity);
    setResultBest(sortedTracks.slice(0, 1)); // Retorna a música mais popular/relevante

  }, [searchMusic, setTracks]);



  // Obtém as músicas recentes do usuario
  useEffect(() => {
    const fetchRecentMusics = async () => {
      try {
        const res = await fetch(api + "/recent-tracks/" + idUser, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
          }
        })
        const recentMusics = await res.json();
        setRecentTracks(recentMusics);

      } catch (error) {
        console.log("Erro ao buscar músicas recentes", error);
      }
    };
    if (isAuthenticated && tokenUser) {
      fetchRecentMusics();
    }
  }, [isAuthenticated, currentTrack]);


  // Obtém as músicas favoritas
  useEffect(() => {
    const fetchFavoriteMusics = async () => {
      try {
        const res = await fetch(api + "/favorite/" + idUser, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          }
        })
        const favoriteMusics = await res.json();
        setFavoriteList(favoriteMusics);
      } catch (error) {
        console.log("Erro ao buscar músicas recentes", error);
      }
    };
    if (isAuthenticated && tokenUser) {
      fetchFavoriteMusics();
    }
  }, [isAuthenticated, idUser, tokenUser, favoriteList, setFavoriteList]);


  // Lida com o logout do usuário
  function handleLoggout() {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setTokenUser("");
    navigate("/login")
    setMusicSearch("");
  }



  return (
    <Context.Provider
      value={{
        menuOn,
        setMenuOn,
        profile,
        handleFavorite,
        favoriteList,
        recentTracks,
        tokenUser,
        handleLoggout,
        isAuthenticated,
        handleLogin,
        messagem,
        handleRegister,
        setCurrentTrack,
        currentTrack,
        handleSelectTrack,
        setMusicSearch,
        searchMusic,
        setResultBest,
        resultBest,
        tracks,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthContext };
