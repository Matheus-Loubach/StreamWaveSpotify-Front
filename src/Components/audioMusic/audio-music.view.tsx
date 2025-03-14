import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../Context/AuthContext"
import { FaPlay, FaMusic } from "react-icons/fa"
import { AiFillPauseCircle } from "react-icons/ai"
import { GiNextButton, GiPreviousButton } from "react-icons/gi"
import { Box, Typography, IconButton, Slider, Card } from "@mui/material"

const Audio = () => {
  const { currentTrack, tracks, setCurrentTrack } = useContext(Context)
 

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [noPreview, setNoPreview] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setCurrentTrack(tracks[currentTrackIndex])
    }
  }, [currentTrackIndex, setCurrentTrack])


  useEffect(() => {
    if (currentTrack && currentTrack.preview) {
      setNoPreview(false);
      if (isPlaying) {
        setTimeout(() => {
          audioRef.current?.play();
        }, 100);
      }
    } else {
      setNoPreview(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentTrack && !currentTrack.preview) {
      setNoPreview(true)
      setIsPlaying(false)
    } else {
      setNoPreview(false)
    }

    setCurrentTime(0)

    if (isPlaying && currentTrack?.preview) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 100)
    }
  }, [currentTrack, isPlaying])

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  function handlePlayPause() {
    if (!currentTrack || noPreview) return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function handleSeek(event: Event, newValue: number | number[]) {
    if (audioRef.current && typeof newValue === "number") {
      audioRef.current.currentTime = newValue
      setCurrentTime(newValue)
    }
  }

  function handleNextTrack() {
    if (!tracks || tracks.length === 0) return

    let nextTrackIndex = currentTrackIndex + 1
    if (nextTrackIndex >= tracks.length) {
      nextTrackIndex = 0
    }
    setCurrentTrackIndex(nextTrackIndex)
  }

  function handlePrevTrack() {
    if (!tracks || tracks.length === 0) return

    if (currentTrackIndex === 0) {
      setCurrentTrackIndex(tracks.length - 1)
    } else {
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Card
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.5)",
          overflow: "visible",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "-2px",
            left: "10%",
            right: "10%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.7), transparent)",
            borderRadius: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            p: { xs: 2, sm: 3 },
            gap: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: { xs: "100%", sm: "30%" },
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {currentTrack.albumCover ? (
                <img
                  src={currentTrack.albumCover || "/placeholder.svg"}
                  alt={currentTrack.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(236, 72, 153, 0.2)",
                  }}
                >
                  <FaMusic size={24} style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                </Box>
              )}
            </Box>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentTrack.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentTrack.artist || "Unknown Artist"}
              </Typography>
              {noPreview && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#ec4899",
                    display: "block",
                    mt: 0.5,
                  }}
                >
                  Preview unavailable
                </Typography>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "70%" },
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, sm: 4 },
              }}
            >
              <IconButton
                onClick={handlePrevTrack}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { color: "white" },
                }}
              >
                <GiPreviousButton size={20} />
              </IconButton>

              <IconButton
                onClick={handlePlayPause}
                disabled={noPreview}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: noPreview ? "rgba(236, 72, 153, 0.3)" : "rgba(236, 72, 153, 0.8)",
                  "&:hover": {
                    backgroundColor: noPreview ? "rgba(236, 72, 153, 0.3)" : "#ec4899",
                  },
                  color: "white",
                  transition: "all 0.2s ease",
                  "&:disabled": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {isPlaying ? <AiFillPauseCircle size={24} /> : <FaPlay size={16} />}
              </IconButton>

              <IconButton
                onClick={handleNextTrack}
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { color: "white" },
                }}
              >
                <GiNextButton size={20} />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: { xs: 0, sm: 2 },
              }}
            >
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)", width: 40, textAlign: "right" }}>
                {formatTime(currentTime)}
              </Typography>

              <Slider
                value={currentTime}
                max={duration || 30}
                onChange={handleSeek}
                disabled={noPreview}
                sx={{
                  color: "#ec4899",
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0px 0px 0px 8px rgba(236, 72, 153, 0.16)",
                    },
                    "&.Mui-active": {
                      width: 16,
                      height: 16,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />

              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)", width: 40 }}>
                {formatTime(duration || 30)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>

      <audio
        ref={audioRef}
        src={currentTrack.preview}
        autoPlay={true}
        controls={false}
        loop={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  )
}

export default Audio