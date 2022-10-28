import React from "react";

// RE-USED COMPONENT //
const LabelRename = (props) => {
  const { category, stateSetter } = props;

  const [editLabel, setEditLabel] = React.useState(false);

  function changeLabel(e) {
    setEditLabel(true);
  }

  // need to change state name of expense below;
  function handleChange(e) {
    let currentLabelVal = e.target.value;
    let targetInput = e.target.parentElement.nextSibling.id;

    // PARAMETER BASED HERE
    stateSetter((prevArray) => {
      return prevArray.map((obj) => {
        //this comparison needs a creative method of implementation.
        //using sibling element which is the input of expense number
        if (obj.id === targetInput) {
          return { ...obj, name: currentLabelVal };
        }
        return obj;
      });
    });
  }

  // upon clicking label, it should transform to input change of label.
  function handleLabel(e) {
    let value = e.target.id;
    if (value === "save") {
      setEditLabel(false);
    }
  }

  return (
    <>
      {editLabel ? (
        <>
          <div className="input-div d-flex">
            <input
              autoFocus
              className="rename-input"
              value={props.name}
              onChange={handleChange}
            ></input>
            <button className="rename-option" id="save" onClick={handleLabel}>
              &#10003;
            </button>
          </div>
        </>
      ) : (
        <label className="user-labels" htmlFor={props.id} onClick={changeLabel}>
          {props.name || "Label"}
        </label>
      )}
    </>
  );
};

export default LabelRename;
