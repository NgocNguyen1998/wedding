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
        backgroundImage: "url('/imgs/Background_Love_Story.webp')",
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
          fontSize: isMobile ? "31px" : "40px",
          color: "#8D644D",
          fontWeight: "bold",
          //fontSize: "45px",
          fontFamily: "EB Garamond, serif",
          paddingBottom: 2,
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
