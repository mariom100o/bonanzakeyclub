import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import "../styles/Members.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import Modal from "./Modal";
import AddMember from "./AddMember";
import { AdminContext } from "../App";

const Members = () => {
  const [members, setMembers] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dropId, setDropId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditting, setIsEditting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAdmin = React.useContext(AdminContext);

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await axios(
        "https://keyclubserver.herokuapp.com/members"
      );
      setMembers(members.data);
      setIsLoading(false);
    };

    fetchMembers();
  }, []);

  const handleDrag = (id) => {
    if (!isAdmin) return;
    setDragId(parseInt(id));
  };

  const handleDragOver = (id) => {
    if (!isAdmin) return;

    setDropId(parseInt(id));

    const draggedMember = members.find((member) => member.id === dragId);
    const droppedMember = members.find((member) => member.id === parseInt(id));
    console.log(draggedMember, droppedMember);

    const draggedMemberOrder = draggedMember.order;
    const droppedMemberOrder = droppedMember.order;

    const newOrder = members.map((member) => {
      if (member.id === dragId) {
        member.order = droppedMemberOrder;
      } else if (member.id === parseInt(id)) {
        member.order = draggedMemberOrder;
      }
      return member;
    });

    // Set new order only if the order has changed
    if (draggedMemberOrder !== droppedMemberOrder) {
      setMembers(newOrder);
    }
  };

  const setMemberName = (id, data) => {
    if (!isAdmin) return;

    const member = members.find((member) => member.id === id);
    member.name = data;
    setMembers([...members]);
  };

  const setMemberRole = (id, data) => {
    if (!isAdmin) return;

    const member = members.find((member) => member.id === id);
    member.role = data;
    setMembers([...members]);
  };

  const setMemberBio = (id, data) => {
    if (!isAdmin) return;

    const member = members.find((member) => member.id === id);
    member.bio = data;
    setMembers([...members]);
  };

  const deleteMember = (id) => {
    if (!isAdmin) return;

    setMembers(members.filter((member) => member.id !== id));
  };

  const openModal = () => {
    if (!isAdmin) return;

    setIsModalOpen(true);
  };
  const closeModal = () => {
    if (!isAdmin) return;

    setIsModalOpen(false);
  };

  const updateMembers = (newMember) => {
    if (!isAdmin) return;

    setMembers([...members, newMember]);
    toast.success("Member added!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const saveChanges = () => {
    if (!isAdmin) return;

    setIsSaving(true);
    // Put the saved changes to the database
    axios
      .put("https://keyclubserver.herokuapp.com/members", {
        members,
      })
      .then((res) => {
        setIsEditting(false);
        setIsSaving(false);
        toast.success("Changes saved!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setIsSaving(false);
        toast.error("Error saving changes!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="title-large" id="members">
        Our Members
      </h1>
      {isAdmin ? (
        isEditting ? (
          <button className="save-btn" onClick={() => saveChanges()}>
            {isSaving ? (
              <ReactLoading
                type={"spin"}
                color={"white"}
                height={30}
                width={30}
                css={' margin: "0 auto"; '}
              />
            ) : (
              "Save Changes"
            )}
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditting(true)}>
            Edit
          </button>
        )
      ) : null}
      <div
        className={
          members.length > 0 ? "members-container" : "members-container-empty"
        }
      >
        {members.length > 0 ? (
          members
            .sort((a, b) => a.order - b.order)
            .map((member) => {
              return (
                <MemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  id={member.id}
                  pfpUrl={member.pfpUrl}
                  handleDrag={handleDrag}
                  handleDragOver={handleDragOver}
                  isEditting={isEditting}
                  setMemberName={setMemberName}
                  setMemberRole={setMemberRole}
                  setMemberBio={setMemberBio}
                  deleteMember={deleteMember}
                />
              );
            })
        ) : (
          <h1 className="no-members">No current members</h1>
        )}
        {isAdmin ? (
          <div className="add-member-btn-container">
            <button className="add-member-btn" onClick={() => openModal()}>
              +
            </button>
          </div>
        ) : null}
      </div>

      <div className="pledge">
        <div>I pledge, on my honor,</div>
        <div>to uphold the Objects of Key Club International;</div>
        <div>to build my home, school and community;</div>
        <div>to serve my nation and world;</div>
        <div>
          and combat all forces which tend to undermine these institutions.
        </div>
      </div>
      <Modal isOpen={isModalOpen} openModal={openModal} closeModal={closeModal}>
        <AddMember
          updateMembers={updateMembers}
          closeModal={closeModal}
          membersLength={members.length}
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

export default Members;
