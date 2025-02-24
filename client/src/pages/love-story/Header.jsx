import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        backgroundImage: "url('/imgs/Bia_Love_Story.webp')",
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
            fontSize: isMobile ? 35 : 85,
          }}
        >
          Happy Wedding
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#fe6688",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.978)",
            fontFamily: "'Mr De Haviland', cursive",
            mt: 6,
            textAlign: "left",
            fontStyle: "italic",
            fontSize: isMobile ? "55px" : "6rem",
            letterSpacing: 2,
          }}
        >
          Trung Nam
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#fe6688",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.978)",
            fontFamily: "'Mr De Haviland', cursive",
            my: 2,
            textAlign: "right",
            fontStyle: "italic",
            fontSize: isMobile ? "55px" : "6rem",
            letterSpacing: 2,
          }}
        >
          Nguyen Ngoc
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: isMobile ? 16 : 23,
            mt: 6,
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
            fontSize: isMobile ? 16 : 23,
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

      {/* Wedding Rings Image */}
      {!isMobile && (
        <img
          src="/imgs/ring.webp"
          alt="Wedding Rings"
          style={{
            position: "absolute",
            top: "35%",
            width: isMobile ? "90px" : "120px",
            maxHeight: "80vh ",
            left: isMobile ? "45%" : "49%",
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* Decorative Leaves and Flowers */}
      <img
        src="/imgs/Chiec_La.webp"
        alt="Leaf 1"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: isMobile ? "40px" : "80px",
        }}
      />
      <img
        src="/imgs/La_Hoa.webp"
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
