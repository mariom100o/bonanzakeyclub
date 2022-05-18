import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import "../styles/MemberCard.css";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import defualtPfp from "../images/default-pfp.png";

const MemberCard = ({
  name,
  role,
  bio,
  pfpUrl,
  handleDrag,
  handleDragOver,
  id,
  isEditting,
  setMemberName,
  setMemberRole,
  setMemberBio,
  deleteMember,
}) => {
  const [dragging, setDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const setName = (e) => {
    setMemberName(id, e);
  };
  const setRole = (e) => {
    setMemberRole(id, e);
  };
  const setBio = (e) => {
    setMemberBio(id, e);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="card"
        draggable={isEditting}
        onDragOver={(e) => e.preventDefault()}
        onDragStart={() => {
          handleDrag(id);
          setDragging(true);
        }}
        onDragEnter={() => handleDragOver(id)}
        onDragEnd={() => {
          setDragging(false);
        }}
        id={id}
        style={dragging ? { opacity: 0.5 } : {}}
      >
        {isEditting ? (
          <>
            <FontAwesomeIcon
              icon={faTrash}
              style={{
                position: "absolute",
                cursor: "pointer",
                top: 10,
                right: 10,
              }}
              size="xl"
              onClick={() => openModal()}
            />
          </>
        ) : null}
        <img
          className="img"
          src={pfpUrl ? pfpUrl : defualtPfp}
          draggable="false"
        />
        <div className="container">
          <div className="title">
            {!isEditting ? (
              <div className="name">{name}</div>
            ) : (
              <input
                className="name-input"
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {!isEditting ? (
              <div className="role">{role}</div>
            ) : (
              <input
                className="role-input"
                type="text"
                defaultValue={role}
                onChange={(e) => setRole(e.target.value)}
              />
            )}
          </div>
          {!isEditting ? (
            <p className="bio">{bio}</p>
          ) : (
            <textarea
              className="bio-input"
              defaultValue={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h1 className="confirm-title">
          Are you sure you want to delete this member?
        </h1>
        <div className="button-container">
          <button
            className="delete-btn"
            onClick={() => {
              axios
                .delete(`https://keyclubserver.herokuapp.com/members/${id}`)
                .then(() => {
                  closeModal();

                  toast.success("Member deleted!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  deleteMember(id);
                })
                .catch((err) => {
                  toast.error("Error deleting member!", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
            }}
          >
            Delete
          </button>
          <button className="cancel-btn" onClick={() => closeModal()}>
            Cancel
          </button>
        </div>
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

export default MemberCard;
