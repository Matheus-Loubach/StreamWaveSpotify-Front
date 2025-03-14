import { useContext, useState } from "react"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
} from "@mui/material"
import { FaHome, FaSearch, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa"
import { SiApplemusic } from "react-icons/si"
import { MdLibraryMusic, MdQueueMusic } from "react-icons/md"
import { Context } from "../../Context/AuthContext"


export default function Sidebar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)

  const { handleLogout, profile } = useContext(Context);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { name: "Início", path: "/", icon: <FaHome size={20} /> },
    { name: "Buscar", path: "/search", icon: <FaSearch size={20} /> },
    // { name: "Sua Biblioteca", path: "/library", icon: <MdLibraryMusic size={20} /> },
  ]

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(17,24,39,1) 100%)",
        color: "white",
        zIndex: 10,
        width: { xs: "100%", md: "240px" },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <SiApplemusic className="text-pink-500 mr-2" size={24} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #ec4899, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Stream Wave
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#ec4899",
              mr: 1,
            }}
          >
            <FaUser size={16} />
          </Avatar>
          <Typography className="pr-2" variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
          {profile?.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
        <List>
          {navItems.map((item) => (
            <a key={item.name} href={item.path} style={{ textDecoration: "none" }}>
              <ListItem
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                  }}
                />
              </ListItem>
            </a>
          ))}
        </List>

        <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

        <List>
          <a href="/favorites" style={{ textDecoration: "none" }}>
            <ListItem
              sx={{
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
                <FaHeart size={20} />
              </ListItemIcon>
              <ListItemText
                primary="Músicas Favoritas"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                }}
              />
            </ListItem>
          </a>
        </List>
      </Box>

      <Button
        className="mb-2"
        startIcon={<FaSignOutAlt />}
        onClick={handleLogout}
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          textTransform: "none",
          "&:hover": {
            color: "#ec4899",
            backgroundColor: "transparent",
          },
        }}
      >
        Sair
      </Button>
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
          © 2025 Stream Wave
        </Typography>
      </Box>
    </Box>
  )

  const mobileMenuButton = isMobile && (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 1100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        "&:hover": {
          backgroundColor: "rgba(236, 72, 153, 0.3)",
        },
      }}
    >
      <MdQueueMusic size={40} className="text-pink-500 mr-2" />
    </IconButton>

  )

  return (
    <>
      {mobileMenuButton}

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "280px",
              boxSizing: "border-box",
            },
            display: { xs: "block", md: "none" },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        <Box
          component="aside"
          sx={{
            width: "240px",
            flexShrink: 0,
            height: "100vh",
            position: "sticky",
            top: 0,
            display: { xs: "none", md: "block" },
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  )
}

