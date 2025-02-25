import { Container } from "@mui/material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
const FewWords = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Kiểm tra nếu màn hình là mobile
  return (
    <Box
      sx={{
        position: "relative", // Quan trọng để lớp phủ hoạt động
        paddingTop: 4,
        paddingBottom: 4,
        backgroundImage: "url('/imgs/Background_Thanks.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Màu trắng mờ 30%
          //backdropFilter: "blur(1px)", // Làm mờ background
          //WebkitBackdropFilter: "blur(8px)", // Hỗ trợ Safari
          zIndex: 0,
        },
        "& > *": {
          position: "relative",
          zIndex: 1, // Đảm bảo chữ hiển thị trên lớp phủ
        },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", py: 3, px: 4 }}>
        <Typography
          variant="h4"
          color="#9d6d39"
          gutterBottom
          sx={{
            fontStyle: "italic",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(242, 12, 12, 0.3)",
            letterSpacing: 1,
            fontSize: "35px",
            fontFamily: "EB Garamond, serif",
            color: "#8D644D",
          }}
        >
          Heartfelt Thank You
        </Typography>
        <Typography
          variant="h6"
          color="#e18420"
          gutterBottom
          fontStyle="italic"
          sx={{
            py: 4,
            color: "#f54df0",
            fontFamily: "'Oooh Baby', cursive",
            filter: "brightness(1.1) contrast(1.2)",
            textShadow: "1px 1px 2px #e52626",
            fontSize: isMobile ? "18px" : "25px",
          }}
        >
          "Love is finding happiness in the happiness of the one you love"
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#557c70",
            fontSize: isMobile ? "16px" : "20px",
            fontFamily: "EB Garamond, serif",
            //filter: "brightness(0.75) contrast(1.5)",
          }}
        >
          Dear beloved friends and family,
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#557c70",
            fontSize: isMobile ? "16px" : "20px",
            fontFamily: "EB Garamond, serif",
            //filter: "brightness(0.75) contrast(1.5)",
          }}
        >
          Life is a collection of unforgettable moments, and our special day
          will be even more meaningful with your presence. We understand that
          everyone is busy with work, life, and family, so your time spent
          celebrating with us is truly precious to us.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#557c70",
            fontSize: isMobile ? "16px" : "20px",
            fontFamily: "EB Garamond, serif",
            // filter: "brightness(0.75) contrast(1.5)",
          }}
        >
          Your presence and blessings are not just our joy, but also a sacred
          mark on our new journey together. We hope that on this meaningful day,
          we will create and cherish the most beautiful memories together, so
          that when we look back, our hearts will always remain warm.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "#557c70",
            fontSize: isMobile ? "16px" : "20px",
            fontFamily: "EB Garamond, serif",
            // filter: "brightness(0.75) contrast(1.5)",
          }}
        >
          From the bottom of our hearts, we sincerely thank you and look forward
          to welcoming you on this joyous occasion.
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          mt={6}
          fontStyle="italic"
          sx={{
            textDecoration: "underline",
            color: "#d79145",
            fontSize: isMobile ? "25px" : "35px",
            fontFamily: "Qwigley, serif",
          }}
        >
          Nam & Ngoc
        </Typography>
      </Container>
    </Box>
  );
};

export default FewWords;
