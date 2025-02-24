import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";
import { motion } from "framer-motion";
import Gift from "./Gift";

const Attending = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        backgroundImage: "url('/imgs/background_Confirm.webp')",
        paddingTop: 4,
        paddingBottom: 4,
      }}
      id={props.id}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexDirection: "column",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            color: "#8D644D",
            fontWeight: "bold",
            fontSize: "45px",
            fontFamily: "EB Garamond, serif",
          }}
        >
          Wedding Attending
        </Typography>
        <Typography
          sx={{
            color: "#557c70",
            fontSize: isMobile ? "14px" : "18px",
            fontStyle: "italic",
            fontFamily: "EB Garamond, serif",
          }}
        >
          The wedding will be even more special and meaningful with your
          presence and blessings. Please confirm your attendance so Nam & Ngọc
          can prepare to welcome you in the best possible way ♥️.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Nếu là mobile thì để theo dạng cột
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 4,
          width: "70%", // Thiết lập chiều rộng cố định
          textAlign: "center",
          // maxWidth: "1000px", // Đặt giới hạn chiều rộng tối đa
          margin: "0 auto", // Căn giữa theo chiều ngang
        }}
      >
        {/* Form */}
        <Form />

        {/* Image */}
        <Box
          component={motion.div}
          whileHover={{
            scale: 1.02, // Khi hover, hình ảnh sẽ phóng to
            transition: { duration: 0.3 },
          }}
          sx={{
            width: isMobile ? "109%" : "60%",
            maxWidth: "470px",
            height: "590px",
            borderRadius: 4,
            position: "relative",
            overflow: "hidden",
            backgroundImage: "url(./imgs/DSC00590.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.01)",
              backdropFilter: "blur(1px)",
              borderRadius: 4,
            },
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: isMobile ? "22px" : "24px",
              fontWeight: "bold",
              fontFamily: "'Oooh Baby', cursive",
              color: "#48ae9d",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            It is our great honor to have your presence
          </Typography>
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {" "}
            <Gift />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Attending;
