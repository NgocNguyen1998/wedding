import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
// import SaveIcon from "@mui/icons-material/Save";
import MenuIcon from "@mui/icons-material/Menu";
// import EditIcon from "@mui/icons-material/Edit";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import InfoDialog from "./InfoDialog";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function BasicSpeedDial() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const isOnLoveStoryPage =
    location.pathname === "/love-story" &&
    new URLSearchParams(location.search).get("name") === name;

  console.log("isOnLoveStoryPage: ", isOnLoveStoryPage);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
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

  const actions = [
    {
      icon: <ContactPhoneRoundedIcon sx={{ fontSize: 20 }} />,
      name: "Contact",
      onClick: handleOpenDialog,
    },
    {
      icon: <FavoriteRoundedIcon sx={{ fontSize: 20 }} />,
      name: "Love Story",
      onClick: () => {
        if (isOnLoveStoryPage) {
          scrollToStory();
        } else {
          navigate(`/love-story?name=${name}`);
          // Smooth scroll to the top after navigation
          window.setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 500); // Adjust the time if necessary
        }
      },
    },
    {
      icon: <ConfirmationNumberRoundedIcon sx={{ fontSize: 20 }} />,
      name: "Confimation",
      onClick: () => {
        if (!isOnLoveStoryPage) {
          scrollToAttending();
        } else {
          navigate(`/confirm?name=${name}`);
          // You can scroll after navigation, like this:
          window.setTimeout(() => {
            scrollToAttending();
          }, 500); // Adjust the time if necessary to match your navigation speed
        }
      },
    },
  ];
  return (
    <>
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
          icon={<SpeedDialIcon sx={{ fontSize: 10 }} openIcon={<MenuIcon />} />}
          FabProps={{
            sx: {
              width: "50px", // Điều chỉnh kích thước
              height: "50px",
              backgroundColor: "#db5698", // Màu nền
              "&:hover": {
                backgroundColor: "#ff4081", // Màu hover
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick} // Gọi hàm cuộn khi click
              sx={{
                "& .MuiwebpIcon-root": { fontSize: 20 },
                backgroundColor: "#eae4e7", // Màu nền mặc định
                color: "#201f20", // Màu icon
                transition:
                  "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e1b8cd", // Màu nền khi hover
                  transform: "scale(1.1)", // Tăng nhẹ kích thước
                },
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <InfoDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
}
