import React, { useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import "../styles/AddEvent.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";

const AddEvent = ({ closeModal, updateEvents }) => {
  const [autoResults, setAutoResults] = useState([]);
  const [location, setLocation] = useState("");
  const submitRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getResults = (input) => {
    if (input.length < 3) {
      setAutoResults([]);
      return;
    }
    input = encodeURIComponent(input);
    let results = [];
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=pk.eyJ1IjoiYm9uYW56YWhza2V5Y2x1YiIsImEiOiJjbDEycmMyMGEwMjRhM2pwM3Ewb2JuYmM1In0.NmuQj1jYY30gN59UqVRcmw&proximity=-115.172813,36.114647&country=US`
      )
      .then(function (response) {
        let features = response.data.features;
        for (let feature of features) {
          results.push({
            address: feature.place_name,
            lat: feature.center[1],
            long: feature.center[0],
          });
        }
        setAutoResults(results);
        return results;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const displayMap = () => {};

  return (
    <>
      <h1 className="modal-title">Add an event</h1>
      <Formik
        initialValues={{
          title: "",
          type: "",
          description: "",
          location: "",
          time: {},
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          setIsSubmitting(true);
          let imagekitImage = await axios
            .get("https://keyclubserver.herokuapp.com/imagekitAuth")
            .then((res) => {
              let formData = new FormData();
              formData.append(
                "file",
                `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-marker+285A98(${location.long},${location.lat})/${location.long},${location.lat},14.5,0/500x500?access_token=pk.eyJ1IjoiYm9uYW56YWhza2V5Y2x1YiIsImEiOiJjbDEycmMyMGEwMjRhM2pwM3Ewb2JuYmM1In0.NmuQj1jYY30gN59UqVRcmw`
              );
              formData.append("fileName", "mapImage");
              formData.append("folder", "mapImages");
              formData.append(
                "publicKey",
                "public_RvcoddD/w2gu+um0O577FBGmtF4="
              );
              formData.append("signature", res.data.signature);
              formData.append("expire", res.data.expire);
              formData.append("token", res.data.token);
              return axios.post(
                "https://upload.imagekit.io/api/v1/files/upload",
                formData
              );
            })
            .then((res) => {
              return res.data.url;
            })
            .catch((err) => {
              console.log(err);
            });

          let directions = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.long}`;

          console.log(values.type);
          // Generate a unique id for the event
          let id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          let newEvent = {
            title: values.title,
            type: values.type,
            description: values.description,
            location: values.location,
            time: values.time,
            map: imagekitImage,
            directions: directions,
            id: id,
          };
          axios
            .post("https://keyclubserver.herokuapp.com/events", newEvent)
            .then((res) => {
              updateEvents(newEvent);
              setLocation(null);
              closeModal();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-item">
              <label htmlFor="title" className="label">
                Event name
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Meeting"
                className="text-input"
                required
              />
            </div>
            <div className="auto-complete-container">
              <div className="form-item">
                <label htmlFor="location" className="label">
                  Where?
                </label>
                <Field
                  id="location"
                  name="location"
                  placeholder="Bonanza Highschool"
                  className="text-input"
                  required
                  onKeyUp={(e) => getResults(e.target.value)}
                  onBlur={() => console.log("blurred")}
                  autoComplete="off"
                />
              </div>
              {autoResults.length > 0 ? (
                <div className="auto-complete-results">
                  {autoResults.map((result, idx) => {
                    return (
                      <div
                        key={idx}
                        className="auto-complete-result"
                        onClick={() => {
                          setAutoResults([]);
                          setLocation(result);
                          setFieldValue("location", result.address);
                        }}
                      >
                        <h1 className="auto-complete-result-text">
                          {result.address}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div className="form-item">
              <div id="my-radio-group" className="label">
                What kind of event is it?
              </div>
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="radio-group"
              >
                <label className="radio-text">
                  <Field
                    type="radio"
                    name="type"
                    value="meet"
                    className="radio-btn"
                  />
                  Meeting
                </label>
                <label className="radio-text">
                  <Field
                    type="radio"
                    name="type"
                    value="service"
                    className="radio-btn"
                  />
                  Community Service
                </label>
                <label className="radio-text">
                  <Field
                    type="radio"
                    name="type"
                    value="fundraiser"
                    className="radio-btn"
                  />
                  Fundraiser
                </label>
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="description" className="label">
                Give a desription for the event
              </label>
              <Field
                id="description"
                name="description"
                placeholder="A quick meeting..."
                className="text-input"
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="time" className="label">
                When?
              </label>
              <Field
                type="datetime-local"
                id="time"
                name="time"
                className="text-input"
                required
              />
            </div>
            {location ? (
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-marker+285A98(${location.long},${location.lat})/${location.long},${location.lat},14.5,0/500x500?access_token=pk.eyJ1IjoiYm9uYW56YWhza2V5Y2x1YiIsImEiOiJjbDEycmMyMGEwMjRhM2pwM3Ewb2JuYmM1In0.NmuQj1jYY30gN59UqVRcmw`}
                alt="map preview"
                className="img-preview"
              />
            ) : null}
            <div className="button-container">
              <button type="submit" className="submit-btn" ref={submitRef}>
                {isSubmitting ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={30}
                    width={30}
                    css={' margin: "0 auto"; '}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEvent;
