import React from "react";
import { Zoom } from "react-slideshow-image";
import image1 from "../images/image.jpg";
import image2 from "../images/image.jpg";
import image3 from "../images/image.jpg";
import image4 from "../images/image.jpg";
import image5 from "../images/image.jpg";
// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";
const images = [image1, image2, image3, image4, image5];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};

const Slideshow = () => {
  return (
    <>
      <div className="slide-container" style={{ zIndex: "-1" }}>
        <Zoom {...properties}>
          {images.map((each, index) => (
            <img
              key={index}
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
              src={each}
            />
          ))}
        </Zoom>
      </div>
    </>
  );
};

export default Slideshow;
