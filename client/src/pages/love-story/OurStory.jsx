import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SliderStory from "./Slider";

const OurStory = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      id={props.id}
      sx={{
        backgroundImage: "url('/imgs/Background_Love_Story.png')",
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

          position: "relative",
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
              fontStyle: "normal",
              fontWeight: "300",
              textShadow: "0px 00px 0px rgba(242, 12, 12, 0.3)",
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
              fontStyle: "normal",
              fontWeight: "300",
              textShadow: "0px 00px 0px rgba(242, 12, 12, 0.3)",
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
