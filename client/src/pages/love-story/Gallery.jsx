import React, { useState, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css"; // Import CSS cho lightGallery
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";

// MUI Components
import { Button, Box, useMediaQuery, useTheme } from "@mui/material";

const imageList = [
  {
    src: "/imgs/Gallery/DSC00189.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00189.jpg",
    title: "Our Sunshine Days 💛",
    location: "State Bank of Vietnam - DSC00189",
  },
  {
    src: "/imgs/Gallery/DSC00017.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00017.jpg",
    title: "Together, Wherever Life Takes Us 🌍💑",
    location: "State Bank of Vietnam - DSC00017",
  },
  {
    src: "/imgs/Gallery/DSC00118.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00118.jpg",
    title: "Our Shared Moments of Joy 😊💑",
    location: "State Bank of Vietnam - DSC00118",
  },

  {
    src: "/imgs/Gallery/DSC00368.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00368.jpg",
    title: "The First Look of Love ❤️",
    location: "The Dreams Wedding Venue - DSC00368",
  },
  {
    src: "/imgs/Gallery/DSC00323.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00323.jpg",
    title: "Together, Always and Forever 💑",
    location: "The Dreams Wedding Venue - DSC00323",
  },
  {
    src: "/imgs/Gallery/DSC00361.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00361.jpg",
    title: "Holding Hands, Holding Hearts 💑",
    location: "The Dreams Wedding Venue - DSC00361",
  },
  {
    src: "/imgs/Gallery/DSC00654.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00654.jpg",
    title: "My One and Only Princess 👸",
    location: "The Dreams Wedding Venue - DSC00654",
  },
  {
    src: "/imgs/Gallery/DSC00743.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00743.jpg",
    title: "A House Full of The Dreams Wedding Venue 🏠",
    location: "The Dreams Wedding Venue - DSC00743",
  },
  {
    src: "/imgs/Gallery/DSC00817.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00817.jpg",
    title: "Safe in Your Embrace 🫶",
    location: "The Dreams Wedding Venue - DSC00817",
  },
  {
    src: "/imgs/Gallery/DSC00790.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00790.jpg",
    title: "The Poetry of My Heart 🌿",
    location: "The Dreams Wedding Venue - DSC00790",
  },
  {
    src: "/imgs/Gallery/DSC00696.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00696.jpg",
    title: "The Promise of Forever 🌟",
    location: "The Dreams Wedding Venue - DSC00696",
  },
  {
    src: "/imgs/Gallery/DSC00111.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00111.jpg",
    title: "A Tiny Lane, An Endless Love 🌸",
    location: "State Bank of Vietnam - DSC00111",
  },
  {
    src: "/imgs/Gallery/DSC00590.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00590.jpg",
    title: "A Moment of Pure Passion 💋",
    location: "The Dreams Wedding Venue - DSC00590",
  },
  {
    src: "/imgs/Gallery/DSC00574.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00574.jpg",
    title: "Eyes That Belong to Only Me 👀💖",
    location: "The Dreams Wedding Venue - DSC00574",
  },
  {
    src: "/imgs/Gallery/DSC00450.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00450.jpg",
    title: "Right Now, Only You and Me 🕰️",
    location: "The Dreams Wedding Venue - DSC00450",
  },
  {
    src: "/imgs/Gallery/DSC00441.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00441.jpg",
    title: "Together, We Step into Happines 🚪💖",
    location: "The Dreams Wedding Venue - DSC00441",
  },
  {
    src: "/imgs/Gallery/DSC00540.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00540.jpg",
    title: "Lost in Thoughts of You 💭",
    location: "The Dreams Wedding Venue - DSC00540",
  },
  {
    src: "/imgs/Gallery/DSC00425.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00425.jpg",
    title: "Our Day of Love 💍",
    location: "The Dreams Wedding Venue - DSC00425",
  },
  {
    src: "/imgs/Gallery/DSC09773.jpg",
    thumb: "/imgs/Gallery/thumb/DSC09773.jpg",
    title: "Love Bridges Two Shores of Longing 🌉",
    location: "Bạch Đằng Wharf - DSC09773",
  },
  {
    src: "/imgs/Gallery/DSC00961.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00961.jpg",
    title: "A Fresh Beginning of Joy 🎉",
    location: "The Dreams Wedding Venue - DSC00961",
  },
  {
    src: "/imgs/Gallery/DSC00919.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00919.jpg",
    title: "A Fairytale Love: The Prince & The Princess 🏰",
    location: "The Dreams Wedding Venue - DSC00919",
  },
  {
    src: "/imgs/Gallery/DSC00952.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00952.jpg",
    title: "When Our Eyes Meet, Hearts Speak 💕",
    location: "The Dreams Wedding Venue - DSC00952",
  },
  {
    src: "/imgs/Gallery/DSC00993.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00993.jpg",
    title: "Hạnh A Journey of Love and Joy 🏞️",
    location: "The Dreams Wedding Venue - DSC00993",
  },
  {
    src: "/imgs/Gallery/DSC00985.jpg",
    thumb: "/imgs/Gallery/thumb/DSC00985.jpg",
    title: "A Little Secret, Just for Us 🔐",
    location: "The Dreams Wedding Venue - DSC00985",
  },
  {
    src: "/imgs/Gallery/DSC09734.jpg",
    thumb: "/imgs/Gallery/thumb/DSC09734.jpg",
    title: "True Love or Pure Affection? 🤔",
    location: "Bạch Đằng Wharf - DSC09734",
  },
];

const Gallery = () => {
  const [showGallery, setShowGallery] = useState(false);
  const firstImageRef = useRef(null);

  useEffect(() => {
    console.log("Gallery status:", showGallery);

    if (showGallery) {
      // Mở LightGallery
      if (firstImageRef.current) {
        console.log("Clicking first image...");
        firstImageRef.current.click();
      }

      // Chặn scroll khi mở Gallery
      document.documentElement.style.overflow = "hidden";
      document.addEventListener(
        "touchmove",
        (event) => event.preventDefault(),
        { passive: false }
      );
    } else {
      // Bật lại scroll khi đóng Gallery
      document.documentElement.style.overflow = "auto";
      document.removeEventListener("touchmove", (event) =>
        event.preventDefault()
      );
    }

    return () => {
      // Cleanup khi unmount
      document.documentElement.style.overflow = "auto";
      document.removeEventListener("touchmove", (event) =>
        event.preventDefault()
      );
    };
  }, [showGallery]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /*************  ✨ Codeium Command 🌟  *************/
  const handleCloseGallery = () => {
    console.log("Closing gallery...");
    setTimeout(() => setShowGallery(false), 200); // Delay để tránh lỗi
  };

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
