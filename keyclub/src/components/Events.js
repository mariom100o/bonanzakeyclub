import React, { useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import Header from "./Header";
import "../styles/Events.css";
import image from "../images/image.jpg";
import axios from "axios";
import formData from "form-data";
import Modal from "./Modal";
import AddEvent from "./AddEvent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "../App";

const Events = () => {
  const [isDisplayingPast, setIsDisplayingPast] = useState(false);
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = React.useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios("https://keyclubserver.herokuapp.com/events");
      setEvents(res.data);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const handleClick = async () => {
    let curr = isDisplayingPast;
    setIsDisplayingPast(!curr);
  };

  const openModal = () => {
    if (!isAdmin) return;
    setIsModalOpen(true);
  };
  const closeModal = () => {
    if (!isAdmin) return;

    setIsModalOpen(false);
  };

  const updateEvents = (newEvent) => {
    if (!isAdmin) return;

    setEvents([...events, newEvent]);
    toast.success("Event added!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const editEvent = (newValues, id) => {
    if (!isAdmin) return;

    const newEvents = events.map((event) => {
      if (event.id === id) {
        return { ...event, ...newValues };
      }
      return event;
    });
    setEvents(newEvents);
    toast.success("Event Edited!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteEvent = (id) => {
    if (!isAdmin) return;

    const newEvents = events.filter((event) => event.id !== id);
    setEvents(newEvents);
    toast.error("Event Deleted!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  // const uploadImage = (images) => {
  //   if (!images[0]) return;
  //   let formData = new FormData();
  //   formData.append("file", images[0]);
  //   formData.append("fileName", "profileImage");
  //   formData.append("folder", "profilePictures");
  //   formData.append("publicKey", "public_RvcoddD/w2gu+um0O577FBGmtF4=");
  //   axios
  //     .get("https://keyclubserver.herokuapp.com/imagekitAuth")
  //     .then((res) => {
  //       formData.append("signature", res.data.signature);
  //       formData.append("expire", res.data.expire);
  //       formData.append("token", res.data.token);
  //     })
  //     .then(() => {
  //       return axios.post(
  //         "https://upload.imagekit.io/api/v1/files/upload",
  //         formData
  //       );
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  //   axios.post("https://keyclubserver.herokuapp.com/profilePicture", {
  //     input: images[0],
  //   });
  // };

  return (
    <>
      <Header title="Upcoming Events" img={image} />
      <div className="event-container">
        {events.filter(
          (event) => new Date(event.time).getTime() >= Date.now() + 10800000
        ).length > 0 ? (
          <>
            {events
              .filter(
                (event) =>
                  new Date(event.time).getTime() >= Date.now() + 10800000
              )
              .map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                    map={event.map}
                    type={event.type}
                    directions={event.directions}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                  />
                );
              })}
          </>
        ) : (
          <h1 className="no-events">No upcoming events</h1>
        )}
        {isAdmin ? (
          <button className="add-event" onClick={() => openModal()}>
            +
          </button>
        ) : null}
        {/* 
        <div>
          <input
            type="text"
            onChange={(e) => getResults(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files)}
          ></input>
        </div> */}
      </div>

      {isDisplayingPast ? (
        <div className="event-container">
          {events
            .filter(
              (event) => new Date(event.time).getTime() < Date.now() + 10800000
            )
            .map((event, idx) => {
              return (
                <EventCard
                  key={idx}
                  title={event.title}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  map={event.map}
                  past={event.past}
                  directions={event.directions}
                  id={event.id}
                  editEvent={editEvent}
                  deleteEvent={deleteEvent}
                />
              );
            })}
        </div>
      ) : null}
      {!isDisplayingPast &&
      events.filter(
        (event) => new Date(event.time).getTime() < Date.now() + 10800000
      ).length > 0 ? (
        <div className="past-events-link-container">
          <h1 className="past-events-link" onClick={() => handleClick()}>
            View past events
          </h1>
        </div>
      ) : null}

      <Modal isOpen={isModalOpen} openModal={openModal} closeModal={closeModal}>
        <AddEvent
          closeModal={closeModal}
          updateEvents={updateEvents}
          events={events}
        />
      </Modal>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "#181818" }}
      />
    </>
  );
};

export default Events;
