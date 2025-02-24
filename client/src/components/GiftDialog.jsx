import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Button,
  Box,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GiftDialog = ({ open, handleClose }) => {
  const accounts = {
    GROOM: { qr: "./imgs/stk1.jpg", account: "8007041032366" },
    BRIDE: { qr: "./imgs/stk2.jpg", account: "8007041032487" },
  };

  const downloadQR = (qrPath, name) => {
    const link = document.createElement("a");
    link.href = qrPath;
    link.download = `${name}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [copied, setCopied] = useState(null);

  const copyAccount = (accountNumber, key) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ maxWidth: "540px", margin: "auto" }}
    >
      <DialogTitle
        sx={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
      >
        Wedding Gift Box
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="body2" gutterBottom marginBottom={2}>
          The couple sincerely thanks everyone for their love ♥
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {Object.entries(accounts).map(([key, info]) => (
            <Box
              key={key}
              textAlign="center"
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 1.5,
                width: "40%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                mb={2}
                mt={1}
                color="#e07a7a"
                fontSize={15}
              >
                {key === "GROOM" ? "For the Bride💖" : "For the Groom💙"}
              </Typography>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 0,
                  width: "100%",
                  height: 250,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={info.qr}
                  alt={`QR code for ${key}`}
                  style={{ width: "120%", height: "115%", objectFit: "cover" }}
                />
              </Box>
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
                mt={1}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    height: 27,
                    fontSize: "10px",
                    textTransform: "none",
                    backgroundColor: "#e07a7a",
                    width: "80px",
                  }}
                  onClick={() => downloadQR(info.qr, key)}
                >
                  Download
                </Button>
                <Tooltip
                  title={copied === key ? "Copied!" : ""}
                  arrow
                  open={copied === key}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      height: 27,
                      fontSize: "10px",
                      textTransform: "none",
                      backgroundColor: "#e07a7a",
                      width: "80px",
                    }}
                    onClick={() => copyAccount(info.account, key)}
                  >
                    Copy acc
                  </Button>
                </Tooltip>
              </Stack>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default GiftDialog;
