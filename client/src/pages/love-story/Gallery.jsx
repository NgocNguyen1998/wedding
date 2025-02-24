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
    src: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=240&q=80",
    title: "Massimiliano Morosinotto",
    location: "Tre Cime di Lavaredo, Italia",
  },
  {
    src: "https://images.unsplash.com/photo-1605973029521-8154da591bd7?auto=format&fit=crop&w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1605973029521-8154da591bd7?auto=format&fit=crop&w=240&q=80",
    title: "Sascha Bosshard",
    location: "Pizol, Mels, Schweiz",
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
