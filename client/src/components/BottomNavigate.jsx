import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import { Pause, PlayArrow } from "@mui/icons-material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InfoDialog from "./InfoDialog";
const BottomNavigate = ({ isPlaying, togglePlay }) => {
  const [value, setValue] = useState(
    () => parseInt(sessionStorage.getItem("bottomNavValue")) || 0
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  const isOnLoveStoryPage =
    location.pathname === "/love-story" &&
    new URLSearchParams(location.search).get("name") === name;
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setValue(0);
    sessionStorage.setItem("bottomNavValue", "0");
    setOpenDialog(false);
  };
  const scrollToAttending = () => {
    setTimeout(() => {
      const attendingSection = document.getElementById("attending-section");

      if (attendingSection) {
        attendingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.error("Not found attending-section");
      }
    }, 100);
  };
  const scrollToStory = () => {
    setTimeout(() => {
      const storySection = document.getElementById("story-section");

      if (storySection) {
        storySection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.error("Not found story-section");
      }
    }, 100);
  };
  React.useEffect(() => {
    sessionStorage.setItem("bottomNavValue", "");
  }, []);
  React.useEffect(() => {
    sessionStorage.setItem("bottomNavValue", value);
  }, [value]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          zIndex: 100,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log("newValue: ", newValue);
            setValue(newValue);
          }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.735)", // Xám (gray) với độ mờ 70%
            backdropFilter: "blur(5px)", // Làm mờ nền phía sau
            height: "60px",
            paddingBottom: "2px",
          }}
        >
          <BottomNavigationAction
            label="Music"
            icon={isPlaying ? <Pause /> : <PlayArrow />}
            onClick={togglePlay}
          />
          <BottomNavigationAction
            label="Contact"
            icon={<ContactPhoneRoundedIcon />}
            onClick={handleOpenDialog}
          />
          <BottomNavigationAction
            label="Love Story"
            icon={<FavoriteIcon />}
            onClick={() => {
              if (isOnLoveStoryPage) {
                scrollToStory();
              } else {
                navigate(`/love-story?name=${name}`);
                sessionStorage.setItem("bottomNavValue", "");
                // Smooth scroll to the top after navigation
                window.setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 500); // Adjust the time if necessary
              }
            }}
          />
          <BottomNavigationAction
            label="Confimation"
            icon={<ConfirmationNumberRoundedIcon />}
            onClick={() => {
              if (!isOnLoveStoryPage) {
                scrollToAttending();
              } else {
                navigate(`/confirm?name=${name}`);
                sessionStorage.setItem("bottomNavValue", "");
                // You can scroll after navigation, like this:
                window.setTimeout(() => {
                  scrollToAttending();
                }, 500); // Adjust the time if necessary to match your navigation speed
              }
            }}
          />
        </BottomNavigation>
      </Box>
      <InfoDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
};

export default BottomNavigate;
