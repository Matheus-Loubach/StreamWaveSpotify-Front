import { useState, useContext } from "react"
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Skeleton,
  Chip
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import { FaMusic, FaPlay, FaPause, FaClock } from "react-icons/fa"
import { MdClose, MdHistory } from "react-icons/md"
import { Context } from "../Context/AuthContext";

interface MusicTrack {
  id: string;
  title: string;
  albumCover: string;
  artist: string;
  album: string;
  playedAt: string;
}

export default function HomePage() {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  const { recentTracks, loading, handleSelectTrack } = useContext(Context)

  const togglePlay = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };


  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-black via-purple-950 to-black pb-16">

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          pt: 6,
          pb: 4,
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <MdHistory size={40} className="text-pink-500 mr-2" />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(to right, #ec4899, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tocadas Recentemente
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Reviva suas músicas recentes e continue de onde parou. Sua jornada musical está sempre ao seu alcance.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          pt: 2,
        }}
      >
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid size={{ xs: 12, sm: 3, md: 4, lg: 3 }} key={item}>
                {Array.from(Array(6)).map((item, index) => (
                  <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <div>{item}</div>
                  </Grid>
                ))}
                <Card
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(8px)",
                    height: "100%",
                  }}
                >
                  <Skeleton variant="rectangular" height={180} animation="wave" />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={30} animation="wave" />
                    <Skeleton variant="text" width="60%" height={20} animation="wave" />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} animation="wave" />
                      <Skeleton variant="text" width="30%" height={20} animation="wave" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : recentTracks.length > 0 ? (
          <Grid container spacing={3}>
            {recentTracks.map((music: MusicTrack) => (
              <Grid size={{ xs: 12, sm: 3, md: 4, lg: 3 }} key={music.id}>
                <Card
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)",
                    },
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="180" image={music.albumCover} alt={`${music.title} album cover`} />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          togglePlay(music.id);
                        }}
                        sx={{
                          backgroundColor: "rgba(236, 72, 153, 0.8)",
                          "&:hover": {
                            backgroundColor: "#ec4899",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {playingTrack === music.id ? (
                          <MdClose onClick={() => handleSelectTrack(null)} size={24} style={{ color: "white" }} />
                        ) : (
                          <FaPlay onClick={() => handleSelectTrack(music)} size={24} style={{ color: "white" }} />
                        )}
                      </IconButton>
                    </Box>

                    <Chip
                      icon={<FaClock size={12} />}
                      label={music.playedAt}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(4px)",
                        "& .MuiChip-icon": {
                          color: "#ec4899",
                        },
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          mb: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {music.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {music.artist}
                      </Typography>
                    </Box>

                    {playingTrack === music.id && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          height: "20px",
                          gap: "2px",
                          mt: 2,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: "3px",
                              backgroundColor: "#ec4899",
                              height: `${Math.random() * 100}%`,
                              animation: "equalizer 0.5s infinite alternate",
                              animationDelay: `${i * 0.1}s`,
                              "@keyframes equalizer": {
                                "0%": {
                                  height: `${Math.random() * 30 + 10}%`,
                                },
                                "100%": {
                                  height: `${Math.random() * 70 + 30}%`,
                                },
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              borderRadius: 2,
              p: 4,
            }}
          >
            <FaMusic size={60} className="text-pink-500/30 mb-4" />
            <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
              Nenhuma música recente
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "500px" }}>
              Você ainda não ouviu nenhuma música recentemente. Comece a explorar e a ouvir músicas para ver seu
              histórico aqui!
            </Typography>
          </Box>
        )}
      </Container>
    </main>
  )
}

