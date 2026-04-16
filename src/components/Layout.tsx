import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();
  const isShareCard = location.pathname === "/share";
  const isQuestion = location.pathname === "/question";

  return (
    <div className="min-h-screen flex flex-col">
      {!isShareCard && !isQuestion && <TopNav />}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      {!isShareCard && !isQuestion && <BottomNav />}
    </div>
  );
}
