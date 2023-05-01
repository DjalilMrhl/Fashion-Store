import React from "react";
import "./Slider.scss";
import { Carousel } from "react-responsive-carousel";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import img1 from "../../../assets/bg1.avif";
import img2 from "../../../assets/bg2.avif";
import img3 from "../../../assets/bg3.avif";
import img4 from "../../../assets/bg4.avif";
import { IconButton } from "@mui/material";

function Slider() {
  return (
    <Carousel
      stopOnHover={false}
      dynamicHeight={true}
      infiniteLoop={true}
      autoPlay
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onclick) => (
        <IconButton
          onClick={onclick}
          sx={{ zIndex: "1", position: "absolute", top: "25vw", left: "0" }}
        >
          <NavigateBefore
            sx={{ fontSize: "clamp(2rem,8vw,6rem)", color: "white" }}
          />
        </IconButton>
      )}
      renderArrowNext={(onclick) => (
        <IconButton
          onClick={onclick}
          sx={{ zIndex: "1", position: "absolute", top: "25vw", right: "0" }}
        >
          <NavigateNext
            sx={{ fontSize: "clamp(2rem,8vw,6rem)", color: "white" }}
          />
        </IconButton>
      )}
    >
      <div>
        <img src={img1} alt="" />
          <div className="wrapper">
            <p>--New items</p>
            <h1>SUMMER SALE</h1>
            <a href="#shopping-list">Discover More</a>
          </div>
        </div>
        <div>
        <img src={img2} alt="" />
          <div className="wrapper">
            <p>--New items</p>
            <h1>WINTER SALE</h1>
            <a href="#shopping-list">Discover More</a>
          </div>
        </div><div>
        <img src={img3} alt="" />
          <div className="wrapper">
            <p>--New items</p>
            <h1>AUTUMN SALE</h1>
            <a href="#shopping-list">Discover More</a>
          </div>
        </div>
        <div>
        <img src={img4} alt="" />
          <div className="wrapper">
            <p>--New items</p>
            <h1>SPRING SALE</h1>
            <a href="#a">Discover More</a>
          </div>
        </div>
    </Carousel>
  );
}

export default Slider;
