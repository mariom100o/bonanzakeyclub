// React component for the modal to add a member

import React, { useRef, useState } from "react";
import { Formik, Field, Form } from "formik";
import ReactLoading from "react-loading";
import axios from "axios";

const AddMember = ({ closeModal, updateMembers, membersLength }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const submitRef = useRef(null);

  return (
    <>
      <h1 className="modal-title">Add a member</h1>
      <Formik
        initialValues={{
          name: "",
          role: "",
          bio: "",
          id: {},
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          setIsSubmitting(true);
          let pfpUrl = null;
          if (image) {
            console.log("here");
            let formData = new FormData();
            formData.append("file", image);
            formData.append("fileName", "profileImage");
            formData.append("folder", "profilePictures");
            formData.append("publicKey", "public_RvcoddD/w2gu+um0O577FBGmtF4=");
            await axios
              .get("https://keyclubserver.herokuapp.com/imagekitAuth")
              .then((res) => {
                formData.append("signature", res.data.signature);
                formData.append("expire", res.data.expire);
                formData.append("token", res.data.token);
              })
              .then(() => {
                return axios.post(
                  "https://upload.imagekit.io/api/v1/files/upload",
                  formData
                );
              })
              .then((res) => {
                pfpUrl = res.data.url;
                console.log(res.data.url);
              });
          }
          let newMember = {
            name: values.name,
            role: values.role,
            bio: values.bio,
            id: values.id,
            pfpUrl: pfpUrl,
            order: membersLength,
          };
          axios
            .post("https://keyclubserver.herokuapp.com/members", newMember)
            .then((res) => {
              updateMembers(newMember);
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
              <label htmlFor="userImg" className="label">
                Profile picture
              </label>
              <input
                type="file"
                name="userImg"
                id="userImg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <div className="form-item">
              <label htmlFor="name" className="label">
                Member's name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="John Doe"
                className="text-input"
                accept="image/*"
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="role" className="label">
                What's their role?
              </label>
              <Field
                id="role"
                name="role"
                placeholder="Officer"
                className="text-input"
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="bio" className="label">
                Give a short bio about them
              </label>
              <Field
                id="bio"
                name="bio"
                placeholder="I'm a junior at Bonanza High School"
                className="text-input"
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="id" className="label">
                What's their student id?
              </label>
              <Field
                type="number"
                id="id"
                name="id"
                placeholder={123456}
                className="text-input"
                required
              />
            </div>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="profile"
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

export default AddMember;
