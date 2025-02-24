import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { guests } from "../../models/guests";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const lowerName = name?.toLowerCase();
  const guest = guests.find((g) => g.Guest_Code.toLowerCase() === lowerName);

  //const aspectRatio = 530 / 400;
  const [dimensions, setDimensions] = useState({ width: 400, height: 530 });

  useEffect(() => {
    const updateSize = () => {
      const maxWidth = 0.95 * window.innerWidth;
      const maxHeight = 0.8 * window.innerHeight;
      const scale = Math.min(maxWidth / 400, maxHeight / 530);
      setDimensions({
        width: scale * 400,
        height: scale * 530,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (name && !guest) {
    return <Navigate to="/" replace />;
  }

  const handleConfirmClick = () => {
    navigate(name ? `/confirm?name=${name}` : "/");
  };

  const handleLoveStoryClick = () => {
    navigate(name ? `/love-story?name=${name}` : "/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {/* Card Invitation */}
      <Card
        sx={{
          position: "relative",
          width: dimensions.width,
          height: dimensions.height,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          image="/imgs/BiaThiep.webp"
          alt="Wedding Invitation"
          sx={{ objectFit: "cover", width: "100%", height: "100%" }}
        />

        {/* Invitation Text */}
        <Box
          sx={{
            position: "absolute",
            top: "60%", // Cách lề trên 75%
            left: "15%", // Cách lề trái 15%
            right: "15%", // Cách lề phải 15%
            bottom: "12.5%", // Cách lề dưới 12.5%
            textAlign: "center",
            color: "#044d3d",
            textShadow: "1px 1px 1px rgba(2, 91, 23, 0.87)",
            padding: 1,
            borderRadius: 2,
            fontFamily: "'Ephesis', cursive",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //textAlign: "center",

            maxHeight: "100%",
            overflow: "hidden",
            whiteSpace: "normal",
            //wordBreak: "break-word",

            fontSize: "min(1.5vw, 8vh, 3rem)", // Mặc định
            "@media (max-width: 600px)": {
              fontSize: "min(5vw, 10vh, 3rem)", // Tăng cỡ chữ trên mobile
            },
            lineHeight: 1.1, // Giữ khoảng cách dòng nhỏ gọn
          }}
        >
          <span style={{ marginRight: "0.3em" }}>Cordially Invited: </span>
          <span style={{}}>{`${name ? guest.Guest_Name : "Guest"}`}</span>
        </Box>
      </Card>

      {/* Button Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          width: dimensions.width,
          position: "absolute",
          bottom: "2.5%", // Cách đáy màn hình 5%
        }}
      >
        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          onClick={handleConfirmClick}
          sx={{
            borderRadius: 2,
            flex: 1,
            maxWidth: "40%",
            textTransform: "none",
            backgroundColor: "#5cb45f",
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": { backgroundColor: "#329036" },
          }}
        >
          Confirm
        </Button>

        {/* Logo */}
        <motion.div
          animate={{ scale: [1.2, 1.5, 1.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid white",
              backgroundColor: "#fff",
            }}
          >
            <img
              src="/imgs/logo.webp"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        </motion.div>

        <Button
          variant="contained"
          startIcon={<InfoIcon />}
          onClick={handleLoveStoryClick}
          sx={{
            borderRadius: 2,
            flex: 1,
            maxWidth: "40%",
            textTransform: "none",
            backgroundColor: "#5cb45f",
            fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": { backgroundColor: "#329036" },
          }}
        >
          Love Story
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
