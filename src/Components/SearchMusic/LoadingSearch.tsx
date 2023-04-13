import ListMusicSearch from './ListMusicSerch'
import { Track } from '../../Context/TrackType'


interface Props {
    tracks: Track[];
}

//Carregamento das musicas pesquisadas
const LoadingSearch = ({ tracks }: Props) => {
    return (
        <div>
            {tracks &&
                tracks.slice(0, 4).map((track) => (
                    <ListMusicSearch key={track.id} track={track} />
                ))}
        </div>
    );
};

export default LoadingSearch;
