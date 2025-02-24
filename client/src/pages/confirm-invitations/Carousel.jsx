import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

// Tách SlideItem ra ngoài
const SlideItem = ({ imgSrc, isMobile }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
    }}
  >
    <img
      src={imgSrc}
      alt="Slide"
      style={{
        width: isMobile ? "117vw" : "100vw",
        height: "100vh",
        objectFit: "cover",
        objectPosition: "center",
        overflow: "hidden",
      }}
    />
    {/* Lớp phủ blur */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: isMobile ? "130vw" : "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: 1,
      }}
    />
    {/* Nội dung chính */}
    <Box
      sx={{
        width: isMobile ? "100%" : "50%",
        position: "absolute",
        top: "50%",
        left: isMobile ? "50%" : "50%",
        transform: "translate(-50%, -50%)",
        color: "#fe6688",
        fontWeight: "bold",
        fontStyle: "italic",
      }}
    >
      <Typography
        sx={{
          fontSize: isMobile ? "55px" : "10rem",
          letterSpacing: "1px",
          textAlign: "center",
          textShadow: "1px 1px 2px rgba(255, 255, 255, 0.978)",
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
          fontSize: isMobile ? "20px" : "2rem",
          letterSpacing: "1px",
          textAlign: "center",
          paddingTop: 3,
          color: "#e8b2e6",
          fontFamily: "'Oooh Baby', cursive",
          filter: "brightness(1.1) contrast(1.2)",
          textShadow: "1px 1px 2px #4e4d4d",
          width: isMobile ? "90%" : "100%",
          margin: "0 auto",
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
        bottom: "10%",
        right: isMobile ? "-35%" : "1.75%",
        transform: "translateX(-50%)",
        fontStyle: "italic",
      }}
    >
      {["Save", "the", "Date"].map((text) => (
        <Typography
          key={text}
          sx={{
            fontSize: isMobile ? "25px" : "3rem",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
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
        height: "100vh",
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
          <SlideItem key={index} imgSrc={img} isMobile={isMobile} />
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
