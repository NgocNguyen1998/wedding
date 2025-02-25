import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
const itemData = [
  {
    img: "/imgs/Story/DSC00961.webp",
    title: "Bed",
  },

  {
    img: "/imgs/Story/DSC09773.webp",
    title: "Sink",
  },
  {
    img: "/imgs/Story/DSC00441.webp",
    title: "Coffee table",
  },

  {
    img: "/imgs/Story/DSC00985.webp",
    title: "Chairs",
  },
  {
    img: "/imgs/Story/DSC00696.webp",
    title: "Storage",
  },
  {
    img: "/imgs/Story/DSC00705.webp",
    title: "Coffee table",
  },
  {
    img: "/imgs/Story/DSC00952.webp",
    title: "Doors",
  },
  {
    img: "/imgs/Story/DSC09682.webp",
    title: "Blinds",
  },
  {
    img: "/imgs/Story/DSC00111.webp",
    title: "Candle",
  },
  {
    img: "/imgs/Story/DSC00919.webp",
    title: "Coffee",
  },
  {
    img: "/imgs/Story/DSC09734.webp",
    title: "Kitchen",
  },
];

const ImgList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "80%",
        height: "450px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "8px", // Độ rộng thanh cuộn
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#67975e", // Màu cho thanh cuộn
          borderRadius: "4px", // Đổi border-radius cho thanh cuộn
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#5a8a52", // Màu khi hover
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1", // Màu nền của thanh cuộn
          borderRadius: "4px", // Bo góc cho thanh cuộn
        },
      }}
    >
      <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={12}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImgList;
