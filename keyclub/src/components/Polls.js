import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import image from "../images/image.jpg";
import "../styles/Polls.css";
import Poll from "./Poll";
import ReactLoading from "react-loading";

const Polls = () => {
  const [polls, setPolls] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingPast, setIsShowingPast] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      const polls = await axios("https://keyclubserver.herokuapp.com/polls");
      setPolls(polls.data);
      setIsLoading(false);
    };

    fetchPolls();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <Header title="Polls" img={image} />
      <div
        className={
          polls.length > 0 ? "polls-container" : "polls-container-empty"
        }
      >
        {/* <Poll
          title="Should we clean schools on Fridays?"
          res={[
            { id: 0, title: "Yes", votes: 25 },
            { id: 1, title: "No", votes: 37 },
          ]}
          total={62}
        /> */}

        {polls.length > 0 ? (
          polls.map((poll) => {
            return (
              <Poll
                key={poll.id}
                pollId={poll.id}
                title={poll.title}
                res={poll.res}
                total={poll.total}
                past={false}
              />
            );
          })
        ) : (
          <h1 className="no-polls">No ongoing polls</h1>
        )}

        {isShowingPast ? null : null}
      </div>
      {!isShowingPast ? (
        <div className="past-polls-link-container">
          <h1
            className="past-polls-link"
            onClick={() => setIsShowingPast(!isShowingPast)}
          >
            View past polls
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default Polls;
