import type React from "react"
import { useContext } from "react"
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Container,
  IconButton,
  Chip
} from "@mui/material"
import { BsSearch } from "react-icons/bs"
import { FaHeart, FaMusic, FaPlay } from "react-icons/fa"
import { Context } from "../../Context/AuthContext"
import { FavoriteService } from "../favorite/favorite.service"
import { ITrack } from "./search.interface"
import { SearchService } from "./search.service"

const SearchMusic = () => {
  const {
    searchMusic,
    handleSelectTrack,
    setMusicSearch,
    tracks,
    setTracks
  } = useContext(Context)

  const favorite = new FavoriteService();
  const search = new SearchService();

  const handleFavorite = async (track: ITrack) => {
    if (track.isFavorite) {
      await search.deleteFavorite(track);
    } else {
      await favorite.createFavorite(track);
    }

    setTracks((prevTracks: any) =>
      prevTracks.map((t: any) =>
        t.id === track.id ? { ...t, isFavorite: !t.isFavorite } : t
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <main className="min-h-screen md:min-w-screen bg-gradient-to-br from-black via-purple-950 to-black pb-16">
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
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <FaMusic size={40} className="text-pink-500 mr-2" />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Encontre suas músicas favoritas e descubra novas faixas para adicionar à sua coleção.
          </Typography>
        </Container>
      </Box>

      <Container className="max-md:w-[768px]" sx={{ position: "relative", zIndex: 1, pt: 2 }}>
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            mb: 4,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ position: "relative", mb: 4 }}>
                <TextField
                  fullWidth
                  placeholder="O que você quer ouvir?"
                  value={searchMusic}
                  onChange={(e) => setMusicSearch(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(236, 72, 153, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ec4899",
                      },
                    },
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(236, 72, 153, 0.8)",
                    "&:hover": {
                      backgroundColor: "#ec4899",
                    },
                    color: "white",
                  }}
                >
                  <BsSearch />
                </IconButton>
              </Box>
            </form>

            {tracks && tracks.length > 0 ? (
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "white",
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: "linear-gradient(to right, #ec4899, #a855f7)",
                      borderRadius: "2px",
                    },
                  }}
                >
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {tracks.map((track: any, index: number) => (
                    <Card
                      key={index}
                      onClick={() => handleSelectTrack(track)}
                      sx={{
                        display: "flex",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 8px 16px rgba(236, 72, 153, 0.2)",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        },
                        cursor: "pointer",
                        overflow: "hidden",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <Box sx={{ position: "relative", width: 80, height: 80 }}>
                        {track.albumCover ? (
                          <img
                            src={track.albumCover || "/placeholder.svg"}
                            alt={track.title}
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
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
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
                            size="small"
                            sx={{
                              backgroundColor: "#ec4899cc",
                              "&:hover": {
                                backgroundColor: "#ec4899",
                              },
                              color: "white",
                            }}
                          >
                            <FaPlay size={16} />
                          </IconButton>
                        </Box>

                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column", p: 2, flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {track.artist}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {track.title}
                        </Typography>
                        {track.album && (
                          <Chip
                            label={track.album}
                            size="small"
                            sx={{
                              mt: 1,
                              height: 20,
                              backgroundColor: "rgba(236, 72, 153, 0.1)",
                              color: "rgba(255, 255, 255, 0.7)",
                              maxWidth: "fit-content",
                              "& .MuiChip-label": {
                                px: 1,
                                fontSize: "0.7rem",
                              },
                            }}
                          />
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          },
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(track);
                        }}
                      >
                        {track.isFavorite ? (
                          <FaHeart size={20} color="red" />
                        ) : (
                          <FaHeart size={20} color="white" />
                        )}
                      </IconButton>
                    </Card>
                  ))}
                </Box>
              </Box>
            ) : searchMusic ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <FaMusic size={40} className="text-pink-500/30 mb-4" />
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  Buscando...
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Aguarde enquanto procuramos as melhores músicas para você
                </Typography>
              </Box>
            ) : null}

            {!tracks && searchMusic && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  textAlign: "center",
                }}
              >
                <FaMusic size={60} className="text-pink-500/30 mb-4" />
                <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                  Nenhum resultado encontrado
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "500px" }}>
                  Não encontramos nenhuma música com esse termo. Tente buscar por outro artista, música ou álbum.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </main>
  )
}

export default SearchMusic

