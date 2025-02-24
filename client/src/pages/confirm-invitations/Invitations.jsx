import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import {
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import icon Google Maps
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { guests } from "../../models/guests";

const Invitations = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const lowerName = name?.toLowerCase();
  // Kiểm tra xem khách có trong danh sách không
  const guest = guests.find((g) => g.Guest_Code.toLowerCase() === lowerName);
  const side = guest?.Friend === "Groom" ? true : false;
  const side_Groom = guest?.Invite_Side === "Groom" ? true : false;
  const [alignment, setAlignment] = React.useState(side ? "left" : "right");
  const [isSide, setIsSide] = React.useState(side);
  const [isSide_Groom] = React.useState(side_Groom);
  const [selected, setSelected] = React.useState(isSide_Groom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Kiểm tra nếu màn hình là mobile

  const [showFullGroom, setShowFullGroom] = React.useState(false);
  const [showFullBride, setShowFullBride] = React.useState(false);

  const textRef = React.useRef(null);

  const groomText =
    'The groom, Bùi Trung Nam, born on May 11, 1997, under the sign of Taurus, epitomizes determination, hard work, and reliability. Nam carries a strong sense of responsibility and once he sets his mind on something, he follows through to the end. Though he can be a bit "stubborn" at times, his sincerity and warm-hearted nature shine through. His gentle smile has a way of making everyone around him feel at ease.Currently, Nam excels as an integrated circuit design engineer, a role demanding both meticulous attention to detail and creativity. Despite his calm and composed demeanor, he delights in secretly planning surprises for his beloved, as her happiness remains his greatest achievement.';
  const brideText =
    "The bride, Nguyễn Thị Ngọc, born on April 9, 1998, under the sign of Aries, embodies strength, independence, and boundless passion. Ngọc's intelligence and adaptability make her a force to be reckoned with, while her decisiveness adds a touch of determination to her bold personality. Yet, beneath this exterior lies a sincere heart full of warmth and love.As a talented programmer, Ngọc transforms the seemingly dry world of code into a vibrant 'creative playground.' While Nam meticulously designs precise ICs, Ngọc programs the delightful surprises that life has to offer. By Nam's side, she always finds a sense of peace and contentment";

  const handleChange = (event, newAlignment) => {
    // Kiểm tra nếu button mới được chọn khác với button hiện tại
    if (newAlignment !== alignment) {
      setAlignment(newAlignment);
      setIsSide(newAlignment === "left");
      setSelected(newAlignment === "left");
      setShowFullGroom(false);
      setShowFullBride(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        gap: 2,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundImage: "url('/imgs/background_Confirm.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Nút Nhà Gái - Nhà Trai */}
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="text alignment"
        sx={{
          display: "flex",
          justifyContent: "center",
          "& .MuiToggleButton-root": {
            flex: 1, // Chia đều không gian nhưng chỉ mở rộng khi cần
            minWidth: "max-content", // Chỉ mở rộng theo nội dung, không dư thừa
            padding: "8px 16px",
            color: "white",
            backgroundColor: "#a5a8a5",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            fontWeight: "bold", // Duy trì chữ in đậm để tránh thay đổi kích thước khi chọn
            whiteSpace: "nowrap", // Giữ chữ trên một dòng
            "&:hover": {
              backgroundColor: "#35923a !important",
            },
            "&.Mui-selected": {
              backgroundColor: "#1f7822",
              color: "white",
            },
          },
          paddingRight: 1,
        }}
      >
        <ToggleButton
          value="left"
          sx={{
            borderRadius: "8px 0 0 8px",
            borderRight: "2px solid #e9f0e9",
          }}
        >
          <Box component="span" sx={{ fontSize: "1.5em", lineHeight: 0 }}>
            🏡
          </Box>
          Groom's Family
        </ToggleButton>

        <ToggleButton
          value="right"
          sx={{
            borderRadius: "0 8px 8px 0",
          }}
        >
          <Box component="span" sx={{ fontSize: "1.5em", lineHeight: 0 }}>
            💒
          </Box>
          Bride's Family
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Hình ảnh hai bên */}
      <Box
        sx={{
          paddingTop: 1.5,
          display: "flex",
          justifyContent: "center", // Canh giữa theo chiều ngang
          alignItems: "center", // Canh giữa theo chiều dọc
          width: "100%",
          maxWidth: 990,
          gap: 2, // Tạo khoảng cách giữa hai ảnh
          flexDirection: { xs: "column", sm: "row" }, // Chuyển sang cột trên màn hình nhỏ
        }}
      >
        {/* Chỉ hiển thị hình ảnh Bride nếu không phải là mobile hoặc nếu là mobile và muốn hiển thị */}
        {!isMobile || (isMobile && true) ? (
          <Box
            sx={{
              position: "relative",
              width: isMobile ? "90%" : "55%",
            }}
          >
            <img
              src={
                isSide
                  ? "/imgs/NhaTrai_LongAn.webp"
                  : isSide_Groom
                  ? "/imgs/NhaGai_LongAn.webp"
                  : "/imgs/NhaGai_BinhPhuoc.webp"
              }
              alt="Bride"
              style={{
                width: "100%",
                borderRadius: 8,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "66%",
                left: "50%",
                transform: "translateX(-50%)",
                paddingTop: 0.2,
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "space-between", // Đẩy hai chữ ra xa hai bên
                width: isMobile ? "90%" : "80%", // Mở rộng vùng chứa chữ
              }}
            >
              {/* Trung Nam (đẩy về bên trái) */}
              <motion.div
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  position: "absolute",
                  right: "55%", // Đẩy về trái một chút
                  textAlign: "right",
                }}
              >
                <Typography
                  sx={{
                    letterSpacing: "1px",
                    fontFamily: "Alex Brush, serif",
                    fontWeight: "bold",
                    fontSize: isMobile ? "20px" : "25px",
                    fontStyle: "italic",
                    color: "#3c5f48",
                    textShadow: "2px 2px 4px rgba(251, 66, 189, 0.418)",
                  }}
                >
                  {isSide ? "Trung Nam" : "Nguyễn Ngọc"}
                </Typography>
              </motion.div>

              {/* Thị Ngọc (đẩy về bên phải) */}
              <motion.div
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  position: "absolute",
                  left: "55%", // Đẩy về phải một chút
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    letterSpacing: "1px",
                    fontFamily: "Alex Brush, serif",
                    fontWeight: "bold",
                    fontSize: isMobile ? "20px" : "25px",
                    fontStyle: "italic",
                    color: "#3c5f48",
                    textShadow: "2px 2px 4px rgba(251, 66, 189, 0.418)",
                  }}
                >
                  {isSide ? "Nguyễn Ngọc" : "Trung Nam"}
                </Typography>
              </motion.div>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: "7%",
                left: "18%",
                paddingTop: 0.2,
                width: isMobile ? "70%" : "60%",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: isMobile ? "12px" : "15px",
                  fontStyle: "italic",
                  opacity: 0.8,
                  fontFamily: "EB Garamond, sans-serif",
                  color: "#557c70",
                }}
              >
                {isSide
                  ? "Hamlet 2, Long Thuan Commune, Thu Thua District, Long An Province, Vietnam"
                  : isSide_Groom
                  ? "Hamlet 2, Long Thuan Commune, Thu Thua District, Long An Province, Vietnam"
                  : "Minh Tan Hamlet, Tan Tien Commune, Dong Phu District, Binh Phuoc Province, Vietnam"}
                <a
                  href={
                    isSide
                      ? "https://maps.app.goo.gl/22zVbbXrDiAmT6NB6?g_st=com.google.maps.preview.copy"
                      : isSide_Groom
                      ? "https://maps.app.goo.gl/22zVbbXrDiAmT6NB6?g_st=com.google.maps.preview.copy"
                      : "https://maps.app.goo.gl/JvBjfF66bAd8xr3T6"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <LocationOnIcon
                      sx={{ fontSize: 18, cursor: "pointer", color: "#3d853f" }} // Loại bỏ marginLeft để icon sát ngay chữ
                    />
                  </motion.div>
                </a>
              </Typography>
            </Box>
          </Box>
        ) : null}

        {/* Chỉ hiển thị hình ảnh Groom nếu không phải là mobile hoặc nếu là mobile và muốn hiển thị */}
        {!isMobile || (isMobile && true) ? (
          <Box sx={{ position: "relative", width: isMobile ? "90%" : "55%" }}>
            <img
              src="/imgs/Background_Gioithieu.webp"
              alt="Groom"
              style={{
                width: "100%",
                borderRadius: 8,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "5%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: isMobile ? 20 : 24, // Giảm font size cho mobile
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Thêm bóng cho chữ dễ nhìn hơn
              }}
            >
              <ButtonGroup
                variant="text"
                aria-label="Basic button group"
                sx={{ width: "100%" }}
              >
                <Button
                  onClick={() => setSelected(true)}
                  sx={{
                    flex: 1,
                    minWidth: "120px",
                    color: "#ffffff",
                    backgroundColor: "#a5a8a5",
                    fontWeight: selected ? "bold" : "normal",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    //padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#66bb6a",
                      textDecoration: "underline",
                    },
                    ...(selected && {
                      backgroundColor: "#3d853f",
                    }),
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "1.5em", lineHeight: 0 }}
                  >
                    🤵‍♂️
                  </Box>
                  <span>Groom</span>
                </Button>
                <Button
                  onClick={() => setSelected(false)}
                  sx={{
                    flex: 1,
                    minWidth: "120px",
                    color: "#ffffff",
                    backgroundColor: "#a5a8a5",
                    fontWeight: !selected ? "bold" : "normal",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    "&:hover": {
                      backgroundColor: "#e91e63",
                      textDecoration: "underline",
                    },
                    ...(selected === false && {
                      backgroundColor: "#D81B60",
                    }),
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: "1.5em", lineHeight: 0 }}
                  >
                    👰‍♀️
                  </Box>
                  <span>Bride</span>
                </Button>
              </ButtonGroup>
            </Box>
            {/* Ảnh mới bên dưới Button */}
            <Box
              sx={{
                position: "absolute",
                top: "12%", // Điều chỉnh vị trí xuống dưới Button
                left: "50%",
                transform: "translate(-50%, 0%)",
                width: "100%", // Đảm bảo hình gần full ảnh
                textAlign: "center",
              }}
            >
              {selected ? (
                <motion.img
                  src={"/imgs/DSC00540.webp"} // Sử dụng dấu nháy ngược đúng cách
                  alt="Extra"
                  whileHover={{ scale: 1.05 }} // Hiệu ứng phóng to khi hover
                  transition={{ duration: 0.3 }} // Thời gian chuyển đổi hiệu ứng
                  style={{
                    width: !showFullGroom
                      ? isMobile
                        ? "67%"
                        : "55%"
                      : isMobile
                      ? "45%"
                      : "40%",
                    height: !showFullGroom
                      ? isMobile
                        ? "320px"
                        : "325px"
                      : isMobile
                      ? "200px"
                      : "220px",
                    borderRadius: 10,
                    objectFit: "cover", // Giữ hình không bị méo
                  }}
                />
              ) : (
                <motion.img
                  src={"/imgs/DSC00590.webp"} // Sử dụng dấu nháy ngược đúng cách
                  alt="Extra"
                  whileHover={{ scale: 1.05 }} // Hiệu ứng phóng to khi hover
                  transition={{ duration: 0.3 }} // Thời gian chuyển đổi hiệu ứng
                  style={{
                    width: !showFullBride
                      ? isMobile
                        ? "67%"
                        : "55%"
                      : isMobile
                      ? "45%"
                      : "40%",
                    height: !showFullBride
                      ? isMobile
                        ? "320px"
                        : "325px"
                      : isMobile
                      ? "200px"
                      : "220px",
                    borderRadius: 10,
                    objectFit: "cover", // Giữ hình không bị méo
                  }}
                />
              )}
            </Box>

            {/* Đoạn chữ bên dưới ảnh mới */}
            {selected ? (
              <Box
                ref={textRef}
                sx={{
                  position: "absolute",
                  top: !showFullGroom
                    ? isMobile
                      ? "67%"
                      : "60%"
                    : isMobile
                    ? "44%"
                    : "44%", // Đẩy chữ xuống dưới hình
                  left: "50%",
                  transform: "translate(-50%, 0%)",
                  width: "80%",
                  textAlign: "center",
                  color: "#557c70",
                  fontSize: isMobile ? 15 : 16,
                  fontFamily: "EB Garamond, serif",
                }}
              >
                <>
                  <p
                    onClick={() => setShowFullGroom(!showFullGroom)}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    {showFullGroom
                      ? groomText
                      : `${groomText.substring(0, 200)}...`}
                    <span style={{ color: "#c1b565", fontWeight: "bold" }}>
                      {showFullGroom ? " read less" : " read more"}
                    </span>
                  </p>
                  <b>
                    A steadfast Taurus combined with a fiery Aries – a love that
                    is not only enduring but also full of excitement!
                  </b>
                </>
              </Box>
            ) : (
              <Box
                ref={textRef}
                sx={{
                  position: "absolute",
                  top: !showFullBride
                    ? isMobile
                      ? "67%"
                      : "60%"
                    : isMobile
                    ? "44%"
                    : "44%", // Đẩy chữ xuống dưới hình
                  left: "50%",
                  transform: "translate(-50%, 0%)",
                  width: "80%",
                  textAlign: "center",
                  color: "#557c70",
                  fontSize: isMobile ? 15 : 16,
                  fontFamily: "EB Garamond, serif",
                }}
              >
                <>
                  <p
                    onClick={() => setShowFullBride(!showFullBride)}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    {showFullBride
                      ? brideText
                      : `${brideText.substring(0, 200)}...`}
                    <span style={{ color: "#c1b565", fontWeight: "bold" }}>
                      {showFullBride ? " read less" : " read more"}
                    </span>
                  </p>
                  <p>
                    <b>
                      A steadfast Taurus combined with a fiery Aries – a love
                      that is not only enduring but also full of excitement!
                    </b>
                  </p>
                </>
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Invitations;
