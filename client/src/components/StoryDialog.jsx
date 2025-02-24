import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StoryDialog = ({ open, handleClose, text }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        maxWidth: "540px",
        margin: "auto",
        paddingY: 4,
        // position: "relative",
      }}
      PaperProps={{
        style: {
          backgroundColor: "#fffff",
          backdropFilter: "blur(4px)",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker backdrop color with some transparency
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          paddingBottom: 3,
          color: "#557c70",
          //fontSize: isMobile ? 15 : 16,
          fontFamily: "EB Garamond, serif",
        }}
      >
        Love Story
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", paddingY: 3 }}>
        <Typography
          variant="body2"
          gutterBottom
          marginBottom={2}
          sx={{
            color: "#0c0d0d",
            fontSize: 16,
            fontFamily: "EB Garamond, serif",
          }}
        >
          {text}
        </Typography>
      </DialogContent>
      <Box
        sx={{
          position: "absolute",
          top: 6,
          left: 10,
          width: "10%",
          height: "11%",
        }}
      >
        <img
          src="/imgs/Hoa.webp"
          alt="love story"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          textAlign: "right",
          position: "absolute",
          bottom: 6,
          right: 8,
          width: "10%",
          height: "11%",
        }}
      >
        <img
          src="/imgs/Hoa.webp"
          alt="love story"
          style={{ width: "99%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Dialog>
  );
};

export default StoryDialog;
