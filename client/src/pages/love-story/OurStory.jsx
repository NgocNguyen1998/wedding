import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SliderStory from "./Slider";

const OurStory = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      id={props.id}
      sx={{
        backgroundImage: "url('/imgs/Background_Love_Story.webp')",
        // height: "95vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        paddingY: 4,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "#8D644D",
          fontWeight: "bold",
          fontSize: isMobile ? "31px" : "40px",
          fontFamily: "EB Garamond, serif",
          position: "relative",
        }}
      >
        Our Story
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: isMobile ? "-10%" : "-10%",
            width: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: isMobile ? "13px" : "35px",
              color: "#498863",
              textTransform: "uppercase",
              fontFamily: "EB Garamond, serif",
            }}
          >
            Girl meets Boy
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: isMobile ? "13px" : "35px",
              color: "#498863",
              textTransform: "uppercase",
              fontFamily: "EB Garamond, serif",
            }}
          >
            Boy falls for Girl.
          </Typography>
        </Box>
      </Typography>
      <SliderStory isMobile />
    </Box>
  );
};

export default OurStory;
