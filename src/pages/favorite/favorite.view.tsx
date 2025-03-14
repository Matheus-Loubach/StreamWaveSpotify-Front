import { useState, useEffect, useContext } from 'react';
import { Typography, Box, CardMedia, Container, IconButton, Skeleton } from '@mui/material';
import { FaMusic, FaHeart, FaPlay, FaPause } from 'react-icons/fa';
import { FavoriteService } from './favorite.service';
import { ITrack } from '../search/search.interface';
import { Context } from '../../Context/AuthContext';
import { SearchService } from '../search/search.service';
import { MdClose } from 'react-icons/md';


export default function FavoritesPage() {
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const [favoriteList, setFavoriteList] = useState<Array<ITrack>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const search = new SearchService();
    const favorite = new FavoriteService();

    const {
        handleSelectTrack,
    } = useContext(Context)

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const res = await favorite.getFavoriteMusics();
            setFavoriteList(res || []);
            setLoading(false);
        };

        fetchFavorites();
    }, []);

    const handleFavorite = async (track: ITrack) => {
        if (track.isFavorite) {
            await search.deleteFavorite(track);
        } else {
            await favorite.createFavorite(track);
        }

        setFavoriteList((prevTracks: any) =>
            prevTracks.map((t: any) =>
                t.id === track.id ? { ...t, isFavorite: !t.isFavorite } : t
            )
        );
    };

    const togglePlay = (trackId: string) => {
        setPlayingTrack(playingTrack === trackId ? null : trackId);
    };

    return (
        <main className="min-h-screen min-w-screen bg-gradient-to-br from-black via-purple-950 to-black pb-16">
            <Box className="relative  pt-6 pb-4 text-center bg-gradient-to-b from-black/70 to-transparent">
                <Container maxWidth="lg" >
                    <Box className="flex items-center justify-center mb-2">
                        <Typography
                            variant="h3"
                            component="h1"
                            className="font-bold bg-gradient-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent"
                        >
                            Músicas Favoritas
                        </Typography>
                    </Box>
                    <Typography className="text-white/70 mx-auto">
                        Sua coleção pessoal de faixas que você mais ama. Ouça, descubra e se emocione com suas músicas favoritas.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" className="relative pt-2">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-black/40 backdrop-blur-lg p-3 rounded-lg flex items-center">
                                <Skeleton variant="rectangular" width={100} height={100} animation="wave" />
                                <div className="flex flex-col w-full pl-4">
                                    <Skeleton variant="text" width="80%" height={30} animation="wave" />
                                    <Skeleton variant="text" width="60%" height={20} animation="wave" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : favoriteList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {favoriteList.map((music) => (
                            <div key={music.id} className="bg-black/40 backdrop-blur-lg p-3 rounded-lg flex items-center relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                                {playingTrack === music.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-500 to-purple-500" />
                                )}
                                <CardMedia component="img" className="w-24 h-24 object-cover rounded-md" image={music.albumCover} alt={`${music.title} album cover`} />
                                <div className="flex flex-col justify-between w-full px-4">
                                    <div>
                                        <Typography className="text-white max-w-52 font-bold truncate">{music.title}</Typography>
                                        <Typography className="text-white/70 truncate">{music.artist}</Typography>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <IconButton onClick={() => {
                                                togglePlay(music.id);
                                            }}
                                                className={`text-white/70 hover:text-pink-500 ${playingTrack === music.id ? 'text-pink-500' : ''}`}>
                                                {playingTrack === music.id ? <MdClose onClick={() => handleSelectTrack(null)} size={16} color='white' /> : <FaPlay onClick={() => handleSelectTrack(music)} size={16} color='#ec4899cc' />}
                                            </IconButton>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFavorite(music);
                                                }}
                                            >
                                                {music.isFavorite ? (
                                                    <FaHeart size={20} color="red" />
                                                ) : (
                                                    <FaHeart size={20} color="white" />
                                                )}
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Box className="flex flex-col items-center justify-center min-h-[300px] text-center bg-black/40 backdrop-blur-lg rounded-lg p-4">
                        <FaMusic size={60} className="text-pink-500/30 mb-4" />
                        <Typography className="text-white text-xl mb-2">Nenhuma música nos favoritos</Typography>
                        <Typography className="text-white/70 max-w-lg">
                            Você ainda não adicionou nenhuma música aos seus favoritos. Explore novas músicas e adicione-as à sua coleção!
                        </Typography>
                    </Box>
                )}
            </Container>
        </main>
    );
}
