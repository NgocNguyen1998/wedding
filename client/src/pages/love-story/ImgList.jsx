import {
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "lazysizes";
const itemData = [
  {
    img: "/imgs/Story/DSC00961.jpg",
    title: "Loading DSC00961",
  },

  {
    img: "/imgs/Story/DSC09773.jpg",
    title: "Loading DSC09773",
  },
  {
    img: "/imgs/Story/DSC00441.jpg",
    title: "Loading DSC00441",
  },

  {
    img: "/imgs/Story/DSC00985.jpg",
    title: "Loading DSC00985",
  },
  {
    img: "/imgs/Story/DSC00696.jpg",
    title: "Loading DSC00696",
  },
  {
    img: "/imgs/Story/DSC00705.jpg",
    title: "Loading DSC00705",
  },
  {
    img: "/imgs/Story/DSC00952.jpg",
    title: "Loading DSC00952",
  },
  {
    img: "/imgs/Story/DSC09682.jpg",
    title: "Loading DSC09682",
  },
  {
    img: "/imgs/Story/DSC00111.jpg",
    title: "Loading DSC00111",
  },
  {
    img: "/imgs/Story/DSC00919.jpg",
    title: "Loading DSC00919",
  },
  {
    img: "/imgs/Story/DSC09734.jpg",
    title: "Loading DSC09734",
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
              //loading="lazy"
              class="lazyload"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImgList;
