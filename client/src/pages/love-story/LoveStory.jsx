import { Navigate, useSearchParams } from "react-router-dom";
import { guests } from "../../models/guests";
import Header from "./Header";
import OurStory from "./OurStory";
import ImgAlbum from "./ImgAlbum";
import Footer from "../../components/Footer";
import BasicSpeedDial from "../../components/SpeedDial";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import BottomNavigate from "../../components/BottomNavigate";

const LoveStory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const lowerName = name?.toLowerCase();
  // Kiểm tra xem khách có trong danh sách không
  const guest = guests.find((g) => g.Guest_Code.toLowerCase() === lowerName);
  const [isPlaying, setIsPlaying] = useState(false); // Mặc định phát nhạc

  const audioRef = useRef(new Audio("/music/Westlife-BeautifulinWhite.mp3")); // Đảm bảo đúng đường dẫn
  useEffect(() => {
    const playMusic = () => {
      audioRef.current.currentTime = 19; // Bắt đầu phát từ giây thứ 19
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Autoplay bị chặn:", error));
    };

    const handleUserInteraction = () => {
      playMusic();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    // Listen for visibility change to pause/resume the music
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause the music when the app goes into the background
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Resume the music when the app comes back to the foreground
        if (audioRef.current.currentTime === 0) {
          audioRef.current.currentTime = 19; // Đảm bảo nhạc phát từ giây thứ 19 nếu nó mới bắt đầu
        }
        audioRef.current.play(); // Tiếp tục phát nhạc khi app trở lại foreground
        setIsPlaying(true); // Cập nhật trạng thái nhạc đang phát
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  if (!guest) {
    return <Navigate to="/" replace />;
  }
  // Hàm toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.currentTime === 0) {
        audioRef.current.currentTime = 1;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      {/* Audio player (ẩn) */}
      <audio ref={audioRef} src="/music/Westlife-BeautifulinWhite.mp3" loop />

      {/* Nút Play/Pause ở góc trái */}
      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 1000,
            backgroundColor: isPlaying ? "#5271ff" : " #545454",
            borderRadius: "50%",
            boxShadow: 3,
          }}
        >
          <Tooltip
            title={isPlaying ? "Pause Music" : "Play Music"}
            arrow
            placement="right"
            PopperProps={{
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "window",
                  },
                },
              ],
            }}
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#eecdcd",
                  color: "#474545",
                  fontSize: "0.875rem",
                  boxShadow: 2,
                },
              },
              arrow: {
                sx: {
                  color: "#f8c8c8",
                },
              },
            }}
          >
            <IconButton onClick={togglePlay} sx={{ color: "#f4f4f4" }}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Header />
      <OurStory id="story-section" />
      <ImgAlbum />
      <Footer />
      {!isMobile && <BasicSpeedDial />}
      {isMobile && (
        <BottomNavigate isPlaying={isPlaying} togglePlay={togglePlay} />
      )}
    </>
  );
};

export default LoveStory;
