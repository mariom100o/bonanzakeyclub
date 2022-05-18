import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Polls from "./components/Polls";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/App.css";

export const AdminContext = React.createContext();

const App = () => {
  return (
    <AdminContext.Provider value={false}>
      <div className="app-container">
        <div className="content-container">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/polls" element={<Polls />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AdminContext.Provider>
  );
};

export default App;
