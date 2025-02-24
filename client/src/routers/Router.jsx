import { useRoutes } from "react-router-dom";
import Home from "../pages/home/Home_temp";
import ConfirmInvitations from "../pages/confirm-invitations/ConfirmInvitations";
import LoveStory from "../pages/love-story/LoveStory";

const Router = () =>
  useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/confirm",
      element: <ConfirmInvitations />,
    },
    {
      path: "/love-story",
      element: <LoveStory />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);

export default Router;
