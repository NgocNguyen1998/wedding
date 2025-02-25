import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
//import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useState } from "react";
import GiftDialog from "../../components/GiftDialog";
const Gift = () => {
  const [open, setOpen] = useState(false);

  // Function to handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the dialog
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(224, 186, 186, 0.3)",
          backdropFilter: "blur(4px)",
          padding: 3,
          borderRadius: 2,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          margin: "0 auto",
          cursor: "pointer",
        }}
        onClick={handleClickOpen} // Open dialog on click
      >
        <Typography
          sx={{
            position: "absolute",
            top: "-30px", // Đẩy chữ lên trên ảnh
            left: "50%",
            transform: "translateX(-50%)", // Căn giữa chữ theo chiều ngang
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "cursive",
            color: "#c44569", // Màu chữ hồng đậm
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Nền trắng nhẹ để nổi bật chữ
            padding: "4px 10px",
            borderRadius: "8px",
          }}
        >
          Wedding Gift
        </Typography>
        <motion.img
          src="./imgs/gift.png"
          alt="gift"
          animate={{
            scale: [1, 1.2, 1], // Make the text grow and shrink
            transition: {
              duration: 1,
              repeat: Infinity, // Loop the animation
              ease: "easeInOut",
            },
          }}
          style={{
            width: "210px", // Điều chỉnh kích thước ảnh
            height: "210px",
            cursor: "pointer",
          }}
        />
      </Box>

      <GiftDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Gift;
