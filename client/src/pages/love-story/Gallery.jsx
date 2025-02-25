import React, { useState, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css"; // Import CSS cho lightGallery
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// MUI Components
import { Button, Box, useMediaQuery, useTheme } from "@mui/material";

const imageList = [
  {
    src: "/imgs/Gallery/DSC00189.webp",
    thumb: "/imgs/Gallery/thumb/DSC00189.webp",
    title: "Ngày Nắng Bên Nhau",
    location: "Ngân Hàng Nhà Nước Việt Nam",
  },
  {
    src: "/imgs/Gallery/DSC00368.webp",
    thumb: "/imgs/Gallery/thumb/DSC00368.webp",
    title: "Ánh Mắt Đầu Tiên",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00323.webp",
    thumb: "/imgs/Gallery/thumb/DSC00323.webp",
    title: "Mãi Mãi Bên Nhau",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00167.webp",
    thumb: "/imgs/Gallery/thumb/DSC00167.webp",
    title: "Lướt Qua Đời Nhau",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00361.webp",
    thumb: "/imgs/Gallery/thumb/DSC00361.webp",
    title: "Nắm Tay Nhau Thật Chặt",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00654.webp",
    thumb: "/imgs/Gallery/thumb/DSC00654.webp",
    title: "Nàng Công Chúa Của Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00743.webp",
    thumb: "/imgs/Gallery/thumb/DSC00743.webp",
    title: "Ngôi Nhà Và Những Ước Mơ",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00817.webp",
    thumb: "/imgs/Gallery/thumb/DSC00817.webp",
    title: "Trong Vòng Tay Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00790.webp",
    thumb: "/imgs/Gallery/thumb/DSC00790.webp",
    title: "Nàng Thơ",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00696.webp",
    thumb: "/imgs/Gallery/thumb/DSC00696.webp",
    title: "Lời Hẹn Ước",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00111.webp",
    thumb: "/imgs/Gallery/thumb/DSC00111.webp",
    title: "Lối Nhỏ, Tình To",
    location: "Ngân Hàng Nhà Nước Việt Nam",
  },
  {
    src: "/imgs/Gallery/DSC00590.webp",
    thumb: "/imgs/Gallery/thumb/DSC00590.webp",
    title: "Ánh Mắt Ấy, Dành Riêng Cho Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00574.webp",
    thumb: "/imgs/Gallery/thumb/DSC00574.webp",
    title: "Ánh Mắt Ấy, Dành Riêng Cho Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00590.webp",
    thumb: "/imgs/Gallery/thumb/DSC00590.webp",
    title: "Em Nhìn Lại, Khắc Ghi Khoảnh Khắc Này",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC09850.webp",
    thumb: "/imgs/Gallery/thumb/DSC09850.webp",
    title: "Bình Yên Bên Nhau",
    location: "Ngân Hàng Nhà Nước Việt Nam",
  },
  {
    src: "/imgs/Gallery/DSC00450.webp",
    thumb: "/imgs/Gallery/thumb/DSC00450.webp",
    title: "Giây Phút Này, Chỉ Có Chúng Ta",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00441.webp",
    thumb: "/imgs/Gallery/thumb/DSC00441.webp",
    title: "Bước Vào Cánh Cửa Hạnh Phúc",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00540.webp",
    thumb: "/imgs/Gallery/thumb/DSC00540.webp",
    title: "Suy Tư Về Em",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00425.webp",
    thumb: "/imgs/Gallery/thumb/DSC00425.webp",
    title: "Ngày Mình Chung Đôi",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC09773.webp",
    thumb: "/imgs/Gallery/thumb/DSC09773.webp",
    title: "Tính Yêu Nối Hai Bờ Thương Nhớ",
    location: "Bến Bạch Đằng",
  },
  {
    src: "/imgs/Gallery/DSC00961.webp",
    thumb: "/imgs/Gallery/thumb/DSC00961.webp",
    title: "Hạnh Phúc Mới",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00952.webp",
    thumb: "/imgs/Gallery/thumb/DSC00952.webp",
    title: "Hoàng Tử Và Công Chúa",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00919.webp",
    thumb: "/imgs/Gallery/thumb/DSC00919.webp",
    title: "Hoàng Tử Và Công Chúa",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00952.webp",
    thumb: "/imgs/Gallery/thumb/DSC00952.webp",
    title: "Ánh Mắt Chạm Trái Tim",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00993.webp",
    thumb: "/imgs/Gallery/thumb/DSC00993.webp",
    title: "Hạnh Phúc Và Tình Yêu",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00985.webp",
    thumb: "/imgs/Gallery/thumb/DSC00985.webp",
    title: "Bí Mật Nhỏ Của Chúng Mình",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC09734.webp",
    thumb: "/imgs/Gallery/thumb/DSC09734.webp",
    title: "Tình Yêu Hay Sự Yêu Thương",
    location: "Bến Bạch Đằng",
  },
];

const Gallery = () => {
  const [showGallery, setShowGallery] = useState(false);
  const firstImageRef = useRef(null);

  useEffect(() => {
    if (showGallery && firstImageRef.current) {
      firstImageRef.current.click();
    }
  }, [showGallery]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /*************  ✨ Codeium Command 🌟  *************/
  const handleCloseGallery = () => setShowGallery(false);

  return (
    <Box>
      {!showGallery ? (
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setShowGallery(true);
          }}
          sx={{
            color: "#8D644D",
            textTransform: "none",
            backgroundColor: "#f4f4f4",
            fontWeight: "500",
            fontFamily: "EB Garamond, serif",
            boxShadow: "0px 4px 4px rgba(224, 178, 178, 0.25)",
            border: "1px solid #f6ecec",
            borderRadius: "4px",
            padding: "7px 18px",
            fontSize: isMobile ? "15px" : "20px",
          }}
        >
          View more
        </Button>
      ) : (
        <Box>
          {/* Hình ảnh chỉ hiển thị khi showGallery là true */}
          <LightGallery
            plugins={[lgThumbnail]}
            download={false}
            elementClassNames="gallery"
            onAfterClose={handleCloseGallery}
          >
            {imageList.map((img, index) => (
              <a
                key={index}
                className="gallery__item"
                href={img.src}
                data-sub-html={`<h4>${img.title}</h4><p>Location: ${img.location}</p>`}
                ref={index === 0 ? firstImageRef : null}
              >
                <img
                  src={img.thumb}
                  alt={img.title}
                  className="img-responsive"
                  style={{ display: "none" }}
                />
              </a>
            ))}
          </LightGallery>
        </Box>
      )}
    </Box>
  );
};

export default Gallery;
