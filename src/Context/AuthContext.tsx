import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dev } from '../utils/config';
import { getTrack } from '../services/AuthService';
import { ITrack } from '../pages/search/search.interface';

const Context = createContext<any>(null);

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('auth') === 'true');
  const [tokenUser, setTokenUser] = useState<string>(localStorage.getItem('token') || '');
  const [idUser, setIdUser] = useState<string>(localStorage.getItem('idUser') || '');

  const [recentTracks, setRecentTracks] = useState<string[]>([]);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [searchMusic, setMusicSearch] = useState<string>('');

  const [profile, setProfile] = useState<Record<string, unknown>>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${dev}/user/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${tokenUser}` },
        });
        const data = await response.json();
        localStorage.setItem('idUser', data._id);
        setIdUser(data._id);
        setProfile(data);
      } catch (error) {
        console.log('Erro ao buscar perfil:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (currentTrack) {
      sendRecentMusic(currentTrack);
    }
  }, [currentTrack]);

  useEffect(() => {
    const handleTrack = async () => {
      try {
        const data = await getTrack(searchMusic, tokenUser);
        setTracks(data);
      } catch (error) {
        console.log('Erro ao buscar música:', error);
      }
    };
    if (searchMusic) handleTrack();
  }, [searchMusic]);

  useEffect(() => {
    const fetchRecentMusics = async () => {
      if (!isAuthenticated || !tokenUser) return;
      try {
        setLoading(true);
        const response = await fetch(`${dev}/music/recent/${idUser}`, {
          headers: {
            Authorization: `Bearer ${tokenUser}`,
            'Content-Type': 'application/json',
          },
        });
        const recentMusics = await response.json();
        setRecentTracks(recentMusics);
      } catch (error) {
        console.log('Erro ao buscar músicas recentes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentMusics();
  }, [isAuthenticated, currentTrack]);

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
  }


  const sendRecentMusic = async (track: ITrack) => {
    try {
      const response = await fetch(`${dev}/music/recent`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenUser}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: idUser, currentTrack: track }),
      });
      console.log('Música recente enviada:', await response.json());
    } catch (error) {
      console.log('Erro ao enviar música recente:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setTokenUser('');
    setMusicSearch('');
    navigate('/login');
  };

  return (
    <Context.Provider
      value={{
        profile,
        recentTracks,
        tokenUser,
        handleLogout,
        isAuthenticated,
        currentTrack,
        handleSelectTrack,
        setMusicSearch,
        searchMusic,
        setIsAuthenticated,
        tracks,
        setCurrentTrack,
        setTracks
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthContext };