import axios from "axios";
import React, { useState } from "react";

const AddPoll = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  return (
    <>
      <h1 className="modal-title">Add a poll</h1>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          setIsSubmitting(true);

          let id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          axios.post("https://keyclubserver.herokuapp.com/polls", {
            id: 1,
            title: title,
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-item">
              <label htmlFor="name" className="label">
                What are you polling?
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Should we meet on Fridays?"
                className="text-input"
                required
              />
            </div>
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

export default AddPoll;
