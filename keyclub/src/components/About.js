import React from "react";
import image1 from "../images/image.jpg";
import ScrollAnimation from "react-animate-on-scroll";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about">
      <div className="section-full">
        <h1 className="title-large" id="about">
          What is keyclub?
        </h1>
        <p className="desc">
          Keyclub provides its members with opportunities to serve, build
          character, and develop leadership. Key Club members around the world
          are learning how to lead and stand for what’s right through service
          and volunteerism.
        </p>
      </div>
      <div className="adj">
        <img className="adj-img" src={image1} />

        <div className="adj-text">
          <h1 className="title-regular">What we do</h1>
          <p className="desc">
            High school student members of Key Club perform acts of service in
            their communities, such as cleaning up parks, collecting clothing
            and organizing food drives. They also learn leadership skills by
            running meetings, planning projects and holding elected leadership
            positions at the club, district and international levels.
          </p>
        </div>
      </div>
      <div className="adj">
        <div className="adj-text">
          <h1 className="title-regular" id="mission">
            Mission Statement
          </h1>
          <p className="desc">
            Key Club is an international, student-led organization that provides
            its members with opportunities to provide service, build character
            and develop leadership.
          </p>
        </div>
        <img className="adj-img" src={image1} />
      </div>
      <div className="adj">
        <img className="adj-img" src={image1} />

        <div className="adj-text">
          <h1 className="title-regular">Our Values</h1>
          <div className="desc-list">
            <ul>
              <li>
                <b>Leadership</b> Leadership is grounded in humility and service
                to others. A true leader listens, recognizes, and empowers.
              </li>
              <li>
                <b>Character building</b> Character is built by everyday acts of
                kindness, integrity and teamwork to grow stronger relationships
                and communities.
              </li>
              <li>
                <b>Caring </b> Compassion for others is a cornerstone of the Key
                Club experience, inspiring action and service to one’s
                community.
              </li>
              <li>
                <b>Inclusiveness </b> We welcome people of all backgrounds and
                ethnicities to join in serving and making a positive difference
                in our world.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
