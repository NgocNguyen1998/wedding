import { Box, Typography } from "@mui/material";
import ImgList from "./ImgList";
import Gallery from "./Gallery";

const ImgAlbum = () => {
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
          //fontSize: "45px",

          paddingBottom: 2,
          fontStyle: "italic",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(242, 12, 12, 0.3)",
          letterSpacing: 1,
          fontSize: "35px",
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
