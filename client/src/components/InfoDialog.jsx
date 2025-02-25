import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { guests } from "../models/guests";

const InfoDialog = ({ open, handleClose }) => {
  const [hovered, setHovered] = useState(false);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const lowerName = name?.toLowerCase();

  // Kiểm tra xem khách có trong danh sách không
  const guest = guests.find((g) => g.Guest_Code.toLowerCase() === lowerName);
  const side = guest?.Friend === "Groom" ? true : false;

  const accounts = {
    GROOM: {
      qr: "/imgs/ChanDung/DSC00540.jpg",
      account: "0334424479",
      address: "Hamlet 2, Long Thuan, Thu Thua, Long An",
      zalo: "https://tinyurl.com/3nhxb6tp",
    },
    BRIDE: {
      qr: "/imgs/ChanDung/DSC00590.jpg",
      account: "0988508139",
      address: "Minh Tan Hamlet, Tan Tien, Dong Phu, Binh Phuoc",
      zalo: "https://tinyurl.com/yck87cu4",
    },
  };

  const selectedAccount = side ? accounts.GROOM : accounts.BRIDE;
  const selectedLabel = side ? "Groom💙" : "Bride💖";
  const [copied, setCopied] = useState(false);

  const copyAccount = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: "#fffffff5", // Màu nền
          backdropFilter: "blur(4px)",
          borderRadius: 3, // Bo góc
        },
      }}
      //fullWidth
      sx={{
        maxWidth: { xs: "95%", sm: "400px", md: "500px" },
        maxHeight: { xs: "468px", sm: "500px", md: "600px" },
        margin: "auto",
        // borderRadius: 8,
        // backgroundColor: "rgba(179, 179, 179, 0.415)",
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "clamp(18px, 2vw, 30px)",
          fontWeight: "bold",
          fontFamily: "EB Garamond, serif",
          color: "#2303f3",
        }}
      >
        Information
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", padding: 2 }}>
        <Typography
          variant="body2"
          gutterBottom
          marginBottom={2}
          sx={{
            fontFamily: "'Oooh Baby', cursive", // Chọn font chữ tùy ý ở đây
            //fontStyle: "italic", // Bạn cũng có thể thêm kiểu chữ như in nghiêng nếu muốn
            fontSize: "clamp(18px, 2vw, 30px)", // Đặt kích thước chữ nếu cần thiết
            color: "#8D644D", // Màu sắc của chữ
            fontWeight: "bold",
          }}
        >
          The couple sincerely thanks everyone for their love ♥
        </Typography>

        {/* Box chứa QR Code + Phone + Address */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            mb={2}
            color="#2d00f4"
            fontSize="20px"
          >
            {selectedLabel}
          </Typography>

          <Stack direction="row" spacing={3} alignItems="center">
            <img
              src={selectedAccount.qr}
              alt="img"
              style={{
                width: "40%",
                height: "40%",
                objectFit: "cover",
                borderRadius: "4%",
              }}
            />

            {/* Cột số điện thoại + Icon Copy */}
            <Stack direction="column" alignItems="flex-start" spacing={1}>
              {/* Số điện thoại */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img
                  src="./imgs/phone.png"
                  alt="phone"
                  width="35px"
                  height={"35px"}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "#000000",
                    textDecoration: "none",
                    fontFamily: "EB Garamond, serif",
                  }}
                  component="a"
                  href={`tel:${selectedAccount.account}`}
                >
                  {selectedAccount.account}
                </Typography>
                {hovered && (
                  <Tooltip title={copied ? "Copied!" : "Copy"} arrow>
                    <IconButton
                      size="small"
                      onClick={() => copyAccount(selectedAccount.account)}
                      sx={{ color: copied ? "#59c6d4" : "inherit" }}
                    >
                      {copied ? (
                        <CheckRoundedIcon fontSize="small" />
                      ) : (
                        <ContentCopyIcon fontSize="10px" />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              {/* Zalo */}
              <Stack direction="row" alignItems="center" spacing={1}>
                {/* Icon động từ ảnh */}
                <motion.img
                  src="./imgs/zalo.png"
                  alt="Location Icon"
                  animate={{ scale: [0.8, 1.2, 0.8] }} // Hiệu ứng to nhỏ
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }} // Lặp vô hạn
                  style={{
                    width: "29px", // Điều chỉnh kích thước ảnh
                    height: "29px",
                    cursor: "pointer",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "15px",
                    color: "blue",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  component="a"
                  href={`${selectedAccount.zalo}`}
                  target="_blank" // Mở link trong tab mới
                  rel="noopener noreferrer" // Tăng bảo mật
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "15px",
                      fontFamily: "EB Garamond, serif",
                      color: " #060606",
                      textDecoration: "none",
                      cursor: "pointer",
                      ":hover": {
                        color: "#0b07fd",
                      },
                    }}
                    component="a"
                    href={selectedAccount.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedAccount.zalo.slice(
                      0,
                      Math.ceil(selectedAccount.zalo.length / 2)
                    ) + "..."}
                  </Typography>
                </Typography>
              </Stack>
              {/* Địa chỉ */}
              <a
                href={
                  side
                    ? "https://maps.app.goo.gl/22zVbbXrDiAmT6NB6?g_st=com.google.maps.preview.copy"
                    : "https://maps.app.goo.gl/JvBjfF66bAd8xr3T6"
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* Icon động từ ảnh */}
                  <motion.img
                    src="./imgs/ggmap.png"
                    alt="Location Icon"
                    animate={{ scale: [0.8, 1.2, 0.8] }} // Hiệu ứng to nhỏ
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }} // Lặp vô hạn
                    style={{
                      width: "29px", // Điều chỉnh kích thước ảnh
                      height: "29px",
                      cursor: "pointer",
                    }}
                  />

                  {/* Địa chỉ */}
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "none",
                      fontFamily: "EB Garamond, serif",
                      textAlign: "left",
                      //   display: "inline-flex",
                      alignItems: "center",
                      color: "#060606",
                      ":hover": {
                        color: "#045fe7",
                      },
                      width: "69%",
                    }}
                  >
                    {selectedAccount.address}
                  </Typography>
                </Stack>
              </a>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
