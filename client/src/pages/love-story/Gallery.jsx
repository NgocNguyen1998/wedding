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
    thumb: "/imgs/Gallery/DSC00189.webp",
    title: "Ngày Nắng Bên Nhau",
    location: "Ngân Hàng Nhà Nước Việt Nam",
  },
  {
    src: "/imgs/Gallery/DSC00368.webp",
    thumb: "/imgs/Gallery/DSC00368.webp",
    title: "Ánh Mắt Đầu Tiên",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00323.webp",
    thumb: "/imgs/Gallery/DSC00323.webp",
    title: "Mãi Mãi Bên Nhau",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00167.webp",
    thumb: "/imgs/Gallery/DSC00167.webp",
    title: "Lướt Qua Đời Nhau",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00361.webp",
    thumb: "/imgs/Gallery/DSC00361.webp",
    title: "Nắm Tay Nhau Thật Chặt",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00654.webp",
    thumb: "/imgs/Gallery/DSC00654.webp",
    title: "Nàng Công Chúa Của Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00743.webp",
    thumb: "/imgs/Gallery/DSC00743.webp",
    title: "Ngôi Nhà Và Những Ước Mơ",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00817.webp",
    thumb: "/imgs/Gallery/DSC00817.webp",
    title: "Trong Vòng Tay Anh",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00790.webp",
    thumb: "/imgs/Gallery/DSC00790.webp",
    title: "Nàng Thơ",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00696.webp",
    thumb: "/imgs/Gallery/DSC00696.webp",
    title: "Lời Hẹn Ước",
    location: "Dreams",
  },
  {
    src: "/imgs/Gallery/DSC00111.webp",
    thumb: "/imgs/Gallery/DSC00111.webp",
    title: "Lối Nhỏ, Tình To",
    location: "Ngân Hàng Nhà Nước Việt Nam",
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
            plugins={[lgZoom, lgThumbnail]}
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
