import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StoryDialog from "../../components/StoryDialog";
import { useState } from "react";

const LoveStoryCard = ({ imgDate, imgMain, text }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          width: isMobile ? "96%" : "93%",
          maxWidth: 400,
          alignItems: "center",
          position: "relative",

          textAlign: "center",
        }}
      >
        {/* Hình 1 */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={imgDate}
            alt="passionate"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Hình 2 */}
        <Box
          sx={{
            width: "100%",
            height: "220px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            position: "relative",
          }}
        >
          <img
            src={imgMain}
            alt="Wedding Moment"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: "8px",
            }}
          />
        </Box>
        {/* Hình 3 */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="/imgs/textbox.webp"
            alt="Letter"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Phần Chữ & Read More (Absolute lên hình thứ 3) */}
        <Box
          sx={{
            // backgroundColor: "white",
            // boxShadow: 2,
            // padding: "16px",
            // borderRadius: "8px",
            position: "absolute",
            bottom: "0px",
            width: isMobile ? "80%" : "85%",
            textAlign: "center",
            border: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? "14px" : "15px",
              color: "#557c70",
              fontFamily: "EB Garamond, serif",
            }}
          >
            {text.slice(0, isMobile ? 60 : 100)} {"..."}
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "#ede3e3",
              color: "#332d2d",
              borderRadius: "20px",
              marginTop: isMobile ? "2px" : "25px",
              fontSize: isMobile ? "9px" : "10px",
              ":hover": {
                backgroundColor: "#8bdbcb",
                animationDuration: "0.5s",
              },
            }}
          >
            READ MORE
          </Button>
        </Box>
      </Stack>
      <StoryDialog open={open} handleClose={handleClose} text={text} />
    </>
  );
};

export default LoveStoryCard;
