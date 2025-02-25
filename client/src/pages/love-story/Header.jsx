import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        position: "relative",
        height: "100dvh",
        backgroundImage: "url('/imgs/Bia_Love_Story.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "top",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: isMobile ? "85%" : "60%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Corinthia, cursive",
            color: "#0d6d5f",
            paddingTop: 5,
            fontSize: isMobile
              ? "clamp(45px,5vw,150px)"
              : "clamp(55px,5vw,100px)",
          }}
        >
          Happy Wedding
        </Typography>

        <Box>
          {" "}
          <Typography
            variant="h4"
            sx={{
              color: "#fe6688",
              paddingLeft: isMobile ? 0 : "4vw",
              paddingTop: isMobile ? "10vh" : "5vh",
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.978)",
              fontFamily: "'Mr De Haviland', cursive",
              mt: 4,
              textAlign: "left",
              fontStyle: "italic",
              fontSize: isMobile
                ? "clamp(35px,12vw,300px) "
                : "clamp(55px,5vw,150px)",
              letterSpacing: 2,
              lineHeight: 0.5,
            }}
          >
            Trung Nam
          </Typography>
          {/* Wedding Rings Image */}
          <img
            src="/imgs/ring.png"
            alt="Wedding Rings"
            style={{
              // position: "absolute",
              // top: "35%",
              width: isMobile ? "60px" : "120px",
              maxHeight: "80vh ",
              // left: isMobile ? "45%" : "49%",
              // transform: "translateX(-50%)",
              lineHeight: "50%",
              paddingTop: isMobile ? "2vh" : "2vh",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "#fe6688",
              paddingRight: isMobile ? 0 : "4vw",
              paddingTop: isMobile ? "0vh" : "2vh",
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.978)",
              fontFamily: "'Mr De Haviland', cursive",
              my: 2,
              textAlign: "right",
              fontStyle: "italic",
              fontSize: isMobile
                ? "clamp(35px,12vw,300px) "
                : "clamp(55px,5vw,150px)",
              letterSpacing: 2,
            }}
          >
            Nguyen Ngoc
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontSize: isMobile
              ? "clamp(10px,4vw,30px)"
              : "clamp(15px,1.2vw,50px)",
            mt: 8,
            color: "#694148",
            fontFamily: "'Oooh Baby', cursive",
            fontWeight: "500",
            filter: "brightness(1.1) contrast(1.2)",
            //textShadow: "1px 1px 2px #4e4d4d",
            textAlign: "center",
            px: isMobile ? 2 : 6,
          }}
        >
          "Love and destiny are things we cannot shape. But we can write our own
          story, letting that love illuminate every moment, and allowing the
          heart of the other to feel its rhythm like a gentle melody."
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: isMobile
              ? "clamp(10px,4vw,30px)"
              : "clamp(15px,1.2vw,50px)",
            mt: 6,
            color: "#694148",
            fontFamily: "'Oooh Baby', cursive",
            fontWeight: "500",
            filter: "brightness(1.1) contrast(1.2)",
            textAlign: "right",
            px: isMobile ? 2 : 5.5,
          }}
        >
          Together, we weave a love story filled with romance.
        </Typography>
      </Box>

      {/* Decorative Leaves and Flowers */}
      <img
        src="/imgs/Chiec_La.png"
        alt="Leaf 1"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: isMobile ? "50px" : "80px",
        }}
      />
      <img
        src="/imgs/La_Hoa.png"
        alt="Leaf 2"
        style={{
          position: "absolute",
          bottom: "1%",
          right: "2%",
          width: isMobile ? "70px" : "130px",
        }}
      />
    </Box>
  );
};

export default Header;
