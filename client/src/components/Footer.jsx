import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: isMobile ? 120 : 140,
        position: "relative",
        backgroundImage: "url('/imgs/Footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      }}
    >
      {/* Logo & Designer Info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          zIndex: 1,
          px: 0.2,
          position: isMobile ? "absolute" : "relative", // Cố định logo ở vị trí dưới cùng
          bottom: isMobile ? 0 : "auto", // Đưa logo sát lề dưới trên mobile
        }}
      >
        <img
          src="/imgs/logo.png"
          alt="Logo"
          style={{
            width: isMobile ? 70 : 110,
            height: isMobile ? 70 : 110,
            borderRadius: "50%",
            marginRight: isMobile ? 5 : 15,
            marginBottom: isMobile ? 5 : "auto", // Xóa khoảng cách bottom trên mobile
          }}
        />
        <Box>
          <Typography
            sx={{ color: "#2c7361", fontSize: isMobile ? "10px" : "16px" }}
          >
            Designed: Marcus Bui
          </Typography>
          <Typography
            sx={{ color: "#2c7361", fontSize: isMobile ? "10px" : "16px" }}
          >
            Built: Ngoc Nguyen
          </Typography>
        </Box>
      </Box>

      {/* Thank You Text */}
      <Typography
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: isMobile ? "40px" : "80px",
          fontFamily: "Mrs Saint Delafield",
          fontWeight: "bold",
          color: "#d3887d",
          zIndex: isMobile ? 0 : 1,
        }}
      >
        Thank You
      </Typography>

      {/* Copyright Info */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          color: "#2c7361",
          zIndex: 1,
          fontSize: isMobile ? "10px" : "17px",
        }}
      >
        2025 Invite.io.vn. All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
