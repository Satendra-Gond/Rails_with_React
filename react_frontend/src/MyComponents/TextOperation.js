import React, { useState } from "react";

export const TextOperation = () => {
  const [text, setText] = useState(""); // State to hold the text
  const [textActionStatus, setTextActionStatus] = useState({
    actionStatus: true,
    actionText: "",
  }); // State to hold the copy status

  const onCopyAction = () => {
    if (text === "") {
      setTextActionStatus({
        actionStatus: false,
        actionText: "Enter some text.",
      });
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setTextActionStatus({
            actionStatus: true,
            actionText: "Text copied successfully!",
          }); // Update the status to success
        })
        .catch(() => {
          setTextActionStatus({
            actionStatus: false,
            actionText: "Failed to copy text.",
          }); // Update the status to error
        });
    }
  };

  const onClearAction = () => {
    setText(""); // Clear the text
    setTextActionStatus({ actionStatus: true, actionText: "" }); // Reset the status
  };

  const onRemoveSpaceAction = () => {
    setText(text.replace(/\s+/g, ''));
  }

  const textOnChangeAction = (e) => {
    setText(e.target.value);
    const words = text.trim().split(/\s+/).filter(word => word.length > 0); // Split and filter out empty strings
    const wordCount = words.length; // Get the number of words
    document.getElementById("wordCount").textContent = wordCount;
  }

  return (
    <>
      <div className="container py-5">
        <h3>Enter your text below:</h3>
        <textarea
          className="form-control"
          id="message"
          rows="5"
          onChange={textOnChangeAction} // Update the text state
          value={text} // Bind the text state to the textarea
          placeholder="Type your text here..."
        ></textarea>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <button
              className="btn btn-sm btn-primary"
              onClick={onCopyAction}
            >
              Copy Text
            </button>

            <button 
              className="btn btn-sm btn-primary mx-2"
              onClick={onRemoveSpaceAction}
            >
              Remove space
            </button>

            <button
              className="btn btn-sm btn-secondary"
              onClick={onClearAction}
            >
              Clear
            </button>
          </div>

          <div>
            {textActionStatus.actionText && (
              <span
                className={`mt-2 ${
                  textActionStatus.actionStatus ? "text-success" : "text-danger"
                }`}
              >
                {textActionStatus.actionText}
              </span>
            )}
          </div>
        </div>

        <span>Total word: <span id="wordCount"></span></span>
      </div>
    </>
  );
};
