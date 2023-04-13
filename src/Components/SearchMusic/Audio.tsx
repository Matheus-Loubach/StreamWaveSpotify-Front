import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import '../../ComponentsCSS/Audio.css'
import { FaPlay } from 'react-icons/fa';
import { AiFillPauseCircle } from 'react-icons/ai';
import { GiNextButton } from 'react-icons/gi';
import { GiPreviousButton } from 'react-icons/gi';


const Audio = () => {
  const { currentTrack, tracks, setCurrentTrack } = useContext(Context);
  const style = { color: "green" }

  //Config audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<any>();

  useEffect(() => {
    //Atualiza o estado do currentTrack com a música atual
    setCurrentTrack(tracks[currentTrackIndex]);
  }, [currentTrackIndex, setCurrentTrack, setCurrentTrackIndex]);


  function handlePlayPause() {

    if (isPlaying && tracks) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = tracks[currentTrackIndex].preview_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  }

  function handleSeek(e: any) {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleNextTrack() {
    let nextTrackIndex = currentTrackIndex + 1;
    if (nextTrackIndex >= tracks.length) {
      nextTrackIndex = 0;
    }
    setCurrentTrackIndex(nextTrackIndex);
    setCurrentTime(0);
  }

  function handlePrevTrack() {
    if (currentTrackIndex === 0) {
      setCurrentTrackIndex(tracks.length - 1);
    } else {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
    }

  }


  return (
    <div className='container_mobileAudio'>
      {currentTrack && (
        <section className='container_footer'>
          <div className='container_fi'>
            <div className='title'>
              <div>
                <img src={currentTrack.album.images[0].url} alt="album" />
              </div>
              <div>
                <h3>{currentTrack.name}</h3>
                <p>{currentTrack.artists[0].name}</p>
              </div>
            </div>

            <div className="audio-player">
              <button className="audio-button" onClick={handlePrevTrack}><GiPreviousButton style={style} /></button>
              <button className="audio-button" onClick={handlePlayPause}> {isPlaying ? <AiFillPauseCircle /> : <FaPlay />} </button>
              <button className="audio-button" onClick={handleNextTrack}><GiNextButton style={style} /></button>
              <audio
                ref={audioRef}
                src={currentTrack.preview_url}
                autoPlay={true}
                controls={false}
                loop={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
              />
              <div className="audio-controls">
                <input
                  className="audio-seek"
                  type="range"
                  min={0}
                  max={audioRef.current?.duration ?? 0}
                  value={currentTime}
                  onChange={handleSeek}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Audio
