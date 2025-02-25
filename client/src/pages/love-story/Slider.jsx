import { Box } from "@mui/material";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import styleSlick from "./Slider.module.css";
import LoveStoryCard from "./LoveStoryCard";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block", right: "-20px" }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-35px" }}
      onClick={onClick}
    ></div>
  );
}
const SliderStory = ({ isMobile }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Current window width:", windowWidth);
  }, [windowWidth]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 800,
    cssEase: "ease-out",
    slidesToShow: 4,
    slidesToScroll: 1,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1366, // iPad Pro 12.9"
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 2, // Show 2 slides on iPad Pro
        },
      },
      {
        breakpoint: 1024, // Standard tablets (iPads, Galaxy Tab)
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 834, // iPad Pro 11"
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // Mobile tablets
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Small phones
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
        width: "75%",
        margin: "0 auto",
        paddingY: 4,
        position: "relative",
      }}
    >
      <Slider {...settings}>
        <LoveStoryCard
          imgDate="/imgs/Giaidoan1.webp"
          imgMain="/imgs/Story/Giaidoan1.jpg"
          text='On the "fateful" night of April 9, 2017, under the starry sky (and the dazzling lights of the park), he and she met for the first time. Amid the lively atmosphere and cheerful laughter, they unexpectedly started talking as if they had known each other for a long time. And the most magical part? It was also her 19th birthday! Perhaps the universe sent a clear message that day: "Your birthday gift this year is... a boyfriend!"'
        />
        <LoveStoryCard
          imgDate="/imgs/Giaidoan2.webp"
          imgMain="/imgs/Story/Giaidoan2.webp"
          text="In the summer of July 2017, they met again – this time, it wasn't an unexpected reunion, but a colorful journey filled with strolls through the streets, exploring sidewalk food stalls, and countless 'serious discussions' about who would pay for the bubble tea. Gradually, they realized that not only did their hearts beat in sync, but they also shared a common love for... food! Then, on the evening of December 4, 2017, under the flickering candlelight arranged in the shape of a heart, he mustered all his courage to confess his love. A moment of suspenseful silence followed... then she broke into a radiant smile like the morning sun and nodded in happiness. And from that moment on, he officially joined the 'club of guys who pamper their girlfriends no matter what!'"
        />

        <LoveStoryCard
          imgDate="/imgs/Giaidoan3.webp"
          imgMain="/imgs/Story/Giaidoan3.jpg"
          text={`Throughout their time together, they not only accumulated countless beautiful memories, but also "collected" quite a few arguments for reasons... no one can remember. Yet, after each disagreement, their bond grew even stronger. Their adventures together, surprise gifts, and adorable quarrels created a love that was both sweet and "playful."

On her 26th birthday, he decided to take his "game" up a notch with a special celebration in Da Nang. And on April 9, 2024, at a dazzling Sky View, she turned around to see him – holding a bouquet of flowers, his eyes full of love. As the melody of "Beautiful in White" played, he looked at her and proposed. Her heart raced... but instead of running away, she nodded enthusiastically! After 7 years of being together, he had officially "debugged" this love and committed to a lifetime promise!`}
        />

        <LoveStoryCard
          imgDate="/imgs/Giaidoan4.webp"
          imgMain="/imgs/Story/Giaidoan4.webp"
          text={`When love has reached "max level" and both sides have "tested the cases" long enough, they decide to step into a new phase: officially becoming husband and wife! On March 11, 2025 (Lunar calendar: 12/02), under the golden sunlight of spring, they will hold hands and walk down the aisle, exchanging vows to spend their lives together.

            But don't get it wrong! This will not be the end of their love story, but rather the beginning of a new "update" – a journey where they will face new challenges together, create even more beautiful and joyful memories, and... spend more money (now that they have a joint account!).
            
            Congratulations on a lasting love, a fulfilling marriage, and a journey ahead filled with joy!`}
        />
      </Slider>
      <style>
        {`
          .slick-dots.custom-dots {
            position: absolute;
            top: 101%; /* Đặt dots ngay dưới ảnh */
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
          }

          .slick-dots.custom-dots li button:before {
               font-size: 13px;
                color: #b7e7dc;
                // border: 4px solid #f5f5f5;
                // border-radius: 50%;
                // width: 13px;
                // height: 13px;
                // line-height: 15px;
                // text-align: center;
            
          }

          .slick-dots.custom-dots li.slick-active button:before {
            color: #489c7a;
            // border: 4px solid #fcfbfc; /* Viền màu hồng nhạt cho dot active */
            // border-radius: 50%;

          }

          /* Loại bỏ padding mặc định của slick */
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

export default SliderStory;
