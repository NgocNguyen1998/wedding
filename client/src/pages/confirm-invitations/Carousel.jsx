import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

// Hàm lấy kích thước viewport chính xác
const getViewportSize = () => {
  const width = document.documentElement.clientWidth;
  const height = window.visualViewport?.height || window.innerHeight;

  // Đảm bảo tỷ lệ 16:9 trên màn hình lớn
  const aspectRatioHeight = (width / 16) * 9;
  return {
    width: width,
    height: width > 1024 ? Math.min(height, aspectRatioHeight) : height,
  };
};

// Component SlideItem
const SlideItem = ({ imgSrc, isMobile, scaleFactor, viewportSize }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      height: `${viewportSize.height}px`,
      width: `${viewportSize.width}px`,
    }}
  >
    <img
      src={imgSrc}
      alt="Slide"
      style={{
        width: "100%",
        height: `${viewportSize.height}px`,
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
    {/* Lớp phủ blur */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: isMobile ? "100%" : "100%",
        height: `${viewportSize.height}px`,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1,
      }}
    />
    {/* Nội dung chính */}
    <Box
      sx={{
        width: isMobile ? "130%" : "150%", // Tự động thay đổi khi xoay
        maxWidth: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scaleFactor})`,
        color: "#e16993",
        textAlign: "center",
        overflow: "visible",
        whiteSpace: "nowrap",
        zIndex: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: isMobile
            ? "clamp(15px, 30vw, 100px)"
            : "clamp(25px, 50vw, 100px)",
          letterSpacing: "2px",
          textAlign: "center",
          textShadow: "1px 1px 2px rgb(255, 255, 255)",
          fontFamily: "'Mr De Haviland', cursive",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? "0px" : "0.5em",
        }}
      >
        <span>Trung Nam</span>
        <span>&</span>
        <span>Nguyen Ngoc</span>
      </Typography>
      <Typography
        sx={{
          fontSize: isMobile
            ? "clamp(10px, 4vh, 40px)"
            : "clamp(15px, 8vh, 30px)",
          letterSpacing: "1px",
          textAlign: "center",
          paddingTop: 5,
          color: "#ffffff",
          fontFamily: "'Oooh Baby', cursive",
          filter: "brightness(1) contrast(1.5)",
          textShadow: "1px 1px 1px #000000",
          width: isMobile ? "100%" : "50%", // Đảm bảo không quá rộng

          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap", // Cho phép xuống dòng nếu không đủ chỗ
          wordBreak: "break-word", // Nếu có từ quá dài, sẽ tự cắt xuống dòng
          whiteSpace: "normal", // Đảm bảo xuống dòng khi cần
        }}
      >
        Between the intersections of time and destiny, we find each other—not as
        a mere inevitability, but as an invaluable gift.
      </Typography>
    </Box>
    {/* Save the Date */}
    <Box
      sx={{
        position: "absolute",
        bottom: isMobile ? "7.5%" : "7.5%",
        right: isMobile ? "-5%" : "1.75%",
        transform: "translateX(-50%)",
        fontStyle: "italic",
      }}
    >
      {["Save", "the Date"].map((text) => (
        <Typography
          key={text}
          sx={{
            fontSize: isMobile
              ? "clamp(10px, 2vh, 40px)"
              : "clamp(10px, 4vh, 30px)",
            letterSpacing: "1px",
            textAlign: "center",
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgb(246, 246, 246)",
            fontFamily: "'Great Vibes', cursive",
            color: "#557c70",
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  </div>
);

const Carousel = () => {
  const [viewportSize, setViewportSize] = useState(getViewportSize());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize(getViewportSize());
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", updateViewportSize);
    window.addEventListener("orientationchange", updateViewportSize);

    return () => {
      window.removeEventListener("resize", updateViewportSize);
      window.removeEventListener("orientationchange", updateViewportSize);
    };
  }, []);

  // Tính toán scaleFactor để điều chỉnh kích thước chữ theo màn hình
  const scaleFactor = Math.min(
    viewportSize.width / (isMobile ? 720 : 1280),
    viewportSize.height / (isMobile ? 1280 : 720)
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 4000,
    // pauseOnHover: true,
    autoplay: true,
    speed: 800,
    fade: true,
    cssEase: "ease-out",
    slidesToShow: 1,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: `${viewportSize.height}px`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {[
          "/imgs/DSC00991.webp",
          "/imgs/DSC00459.webp",
          "/imgs/DSC00743.webp",
        ].map((img, index) => (
          <SlideItem
            key={index}
            imgSrc={img}
            isMobile={isMobile}
            scaleFactor={scaleFactor}
            viewportSize={viewportSize}
          />
        ))}
      </Slider>
      <style>
        {`
          .slick-dots.custom-dots {
            position: absolute;
            top: 92%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
          }
          .slick-dots.custom-dots li button:before {
            font-size: 13px;
            color: #f5b6ef;
          }
          .slick-dots.custom-dots li.slick-active button:before {
            color: #f41c9a;
          }
          .slick-slide {
            padding: 0 !important;
            margin: 0 !important;
          }
          .slick-track {
            display: flex;
          }
          .slick-list {
            margin: 0 !important;
            padding: 0 !important;
          }
        `}
      </style>
    </Box>
  );
};

export default Carousel;
