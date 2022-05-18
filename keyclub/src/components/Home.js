import React from "react";
import Slideshow from "./Slideshow";
import "../styles/Home.css";
import About from "./About";
import Members from "./Members";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Slideshow />
      <About />
      <Members />
    </>
  );
};

export default Home;
