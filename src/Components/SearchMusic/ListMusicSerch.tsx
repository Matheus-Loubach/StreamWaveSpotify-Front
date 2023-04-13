import React, { useContext, useEffect, useState } from 'react';
import '../../ComponentsCSS/ListMusic.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import { GoHeart } from 'react-icons/go';
import { Context } from '../../Context/AuthContext';
import { Track } from '../../Context/TrackType'


interface Props {
    //Musica Pesquisa Pela usúario
    track: Track;
}

const ListMusicSearch: React.FC<Props> = ({ track }) => {
    const { favoriteList, handleFavorite, handleSelectTrack } = useContext(Context);

    //Verifica se a música vai se confimar nos favoritos
    const [isFavorite, setIsFavorite] = useState(false);

    const { name, album, artists, id } = track;

    const isFava = favoriteList.length > 0 && favoriteList.find((favTrack: { id: string; }) => favTrack.id === id);

    useEffect(() => {
        setIsFavorite(isFava);

    }, [isFava]);



    const heartColor = isFavorite ? 'red' : 'white';
    const style = { color: 'white', fontSize: '30px', cursor: 'pointer' };
    const heartStyle = { ...style, color: heartColor }; // novo objeto de estilo com a cor atualizada do coração

    return (
        <div className="container_ListMusic">
            <section>
                <div>
                    <img src={album.images[0].url} alt={`Capa do álbum ${album.name}`} />
                </div>
                <div>
                    <p>{name}</p>
                    <p>{artists[0].name}</p>
                </div>
                <p onClick={() => handleSelectTrack(track)}>
                    <AiFillPlayCircle style={style} />
                </p>
                <p id="iconeHeart" onClick={() => handleFavorite(track)}>
                    <GoHeart style={heartStyle} />
                </p>
            </section>
        </div>
    );
};

export default ListMusicSearch;
