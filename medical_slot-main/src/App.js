import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
// import Footer from "./components/Footer/Footer";
import Footer from "./Component/Footer/Footer";
// import DownloadApp from "./components/Sections/DownloadApp/DownloadApp";
import DownloadApp from "./Component/Sections/DownloadApp/DownloadApp";

function App() {
  return (
    <div>
      <CssBaseline />
      <Outlet />
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;
