import React, { useState } from "react";
import "../styles/Poll.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import ReactLoading from "react-loading";

const Poll = ({ title, res, total, past, pollId }) => {
  const [results, setResults] = useState(res);
  const [totalVotes, setTotalVotes] = useState(total);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["didVote"]);
  const [responseId, setResponseId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = (memberId) => {
    if (cookies.didVote || past) return;

    let newTotal = totalVotes + 1;
    setTotalVotes(newTotal);
    let newResult = [...results];
    newResult[parseInt(responseId)].votes.push(memberId);
    setResults(newResult);
    setCookie("didVote", true, { path: "/" });

    // Send vote to server
    axios
      .post(`https://keyclubserver.herokuapp.com/vote/${pollId}`, {
        option: responseId,
        member: memberId,
      })
      .then((res) => {
        console.log(res);
        toast.success("Voted succesfully!", {
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
        console.log(err);
        toast.error("There was an error voting!", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setIsSubmitting(false);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const promptId = (id) => {
    if (cookies.didVote || past) return;
    setResponseId(id);
    openModal();
  };

  return (
    <>
      <div className="poll" style={past ? { background: "gray" } : null}>
        <div className="container">
          <h1 className="title">{title}</h1>
          {results.map((result) => {
            return (
              <div
                key={result.id}
                id={result.id}
                className="result"
                onClick={() => promptId(result.id)}
                style={
                  cookies.didVote || past
                    ? {
                        background: `linear-gradient(to right, rgba(0, 200, 0, 0.3) ${
                          (result.votes.length / totalVotes) * 100
                        }%, transparent ${
                          (result.votes.length / totalVotes) * 100
                        }%)`,
                      }
                    : null
                }
              >
                {cookies.didVote || past
                  ? `${result.title}: ${result.votes.length} votes`
                  : result.title}
              </div>
            );
          })}
          <h1 className="votes-count">{totalVotes} votes</h1>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h1 className="modal-title">Vote</h1>
        <Formik
          initialValues={{
            memberId: {},
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            setIsSubmitting(true);
            // Make sure this member exists
            let member = await axios
              .get(
                `https://keyclubserver.herokuapp.com/members/${values.memberId}`
              )
              .then((res) => {
                return res.data;
              });
            if (!member) {
              toast.error("A member with this studet id does not exist!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setIsSubmitting(false);
              return;
            }
            // Make sure this member is not already in the poll
            for (let res of results) {
              if (res.votes.includes(values.memberId)) {
                toast.error(
                  "A member with this student id has already voted!",
                  {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                setIsSubmitting(false);
                return;
              }
            }
            console.log("here");
            // Send vote to server
            handleVote(values.memberId);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="form-item">
                <label htmlFor="memberId" className="label">
                  What is your student id?
                </label>
                <Field
                  type="number"
                  id="memberId"
                  name="memberId"
                  placeholder={123456}
                  className="text-input"
                  required
                />
              </div>

              <div className="button-container">
                <button type="submit" className="submit-btn">
                  {isSubmitting ? (
                    <ReactLoading
                      type={"spin"}
                      color={"white"}
                      height={30}
                      width={30}
                      css={' margin: "0 auto"; '}
                    />
                  ) : (
                    "Vote"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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

export default Poll;
