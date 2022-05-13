import { withRouter } from "react-router-dom";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../Commons/Layout/Toolbar/VoucherToolbar";
import Background from "assets/home_banner.png";
import "./Home.scss";
import HomeHeader from "./HomeHeader/HomeHeader";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeBodySidebar from "./HomeBody/HomeBodySidebar";
import HomeBodyContent from "./HomeBody/HomeBodyContent";

const backgroundStyling = {
  background: `url(${Background})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

function Home(props) {
  const [showScrollbar, setShowScrollbar] = useState("hidden");
  const [currentSortMode, setCurrentSortMode] = useState(1);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  const listenScrollEvent = (e) => {
    if (window.scrollY > 410) {
      setShowScrollbar("scroll");
    } else {
      setShowScrollbar("hidden");
    }
  };

  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="main">
        {currentSortMode == 1 && (
          <Fragment>
            <HomeHeader />
            <HomeBanner />
          </Fragment>
        )}
        <div className="home-content">
          <HomeBodySidebar
            type={1}
            showScrollbar={showScrollbar}
            setShowScrollbar={setShowScrollbar}
            currentSortMode={currentSortMode}
            setCurrentSortMode={setCurrentSortMode}
          />
          <HomeBodyContent
            currentSortMode={currentSortMode}
            setCurrentSortMode={setCurrentSortMode}
          />
        </div>
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

export default withRouter(Home);
