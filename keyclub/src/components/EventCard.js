import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHandshake,
  faSackDollar,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../styles/EventCard.css";
import Modal from "./Modal";
import EditEvent from "./EditEvent";
import { AdminContext } from "../App";

const EventCard = ({
  title,
  description,
  time,
  location,
  type,
  map,
  directions,
  editEvent,
  deleteEvent,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = React.useContext(AdminContext);

  const getLogo = () => {
    switch (type) {
      case "fundraiser":
        return faSackDollar;
      case "meet":
        return faHandshake;
      case "service":
        return faHeart;
    }
  };
  let date = new Date(time);

  const getStringDate = (date) => {
    let d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    // Get the time of the day
    let hours = d.getHours();
    let minutes = d.getMinutes();
    // Format minues to be two digits
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    // Format the time
    let time = (hours % 12) + ":" + minutes + " " + (hours >= 12 ? "PM" : "AM");
    // Format the date
    let stringDate = month + "/" + day + "/" + year + " " + time;
    return stringDate;
  };

  const formatAddress = (address) => {
    let formattedAddress = address.split(",");
    if (formattedAddress[0].length > 30) {
      formattedAddress[0] = formattedAddress[0].substring(0, 30) + "...";
    }

    return formattedAddress[0];
  };

  const openModal = () => {
    if (!isAdmin) return;

    setIsModalOpen(true);
  };
  const closeModal = () => {
    if (!isAdmin) return;

    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="event-card"
        style={
          date.getTime() < Date.now() + 10800000
            ? { backgroundColor: "gray" }
            : null
        }
      >
        <div className="event-content">
          <div className="event-title">
            {type ? (
              <FontAwesomeIcon
                icon={getLogo()}
                style={{ paddingRight: "10px" }}
              />
            ) : null}
            {title}
          </div>
          {isAdmin ? (
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
              }}
              size="xl"
              onClick={() => openModal()}
            />
          ) : null}

          <div className="main-event-content">
            <p className="event-desc">{description}</p>
            <div className="map-container">
              <a href={directions} target="_blank" style={{}}>
                <img
                  className="map"
                  src={map}
                  style={
                    date.getTime() < Date.now() + 10800000
                      ? { filter: "brightness(50%)" }
                      : null
                  }
                />
              </a>
            </div>
          </div>
          <div className="location">
            {getStringDate(time) + " @ " + formatAddress(location)}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <EditEvent
          closeModal={closeModal}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
          currentValues={{
            title,
            description,
            time,
            location,
            type,
            map,
            directions,
            id,
          }}
        />
      </Modal>
    </>
  );
};

export default EventCard;
