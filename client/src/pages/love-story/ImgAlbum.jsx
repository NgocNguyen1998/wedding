import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImgList from "./ImgList";
import Gallery from "./Gallery";

const ImgAlbum = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: "url('/imgs/Background_Love_Story.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        paddingY: 4,
        objectFit: "cover",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          //fontSize: "45px",

          paddingBottom: 2,
          fontStyle: "italic",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(242, 12, 12, 0.3)",
          letterSpacing: 1,
          fontSize: isMobile
            ? "clamp(25px,10vw,35px)"
            : "clamp(35px,15vw,50px)",
          fontFamily: "EB Garamond, serif",
          color: "#8D644D",
        }}
      >
        Together, Forever
      </Typography>
      <ImgList />
      <Gallery />
    </Box>
  );
};

export default ImgAlbum;
