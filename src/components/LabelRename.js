import React from "react";

const LabelRename = (props) => {
  const [labelNames, setLabelNames] = React.useState({});
  const [editLabel, setEditLabel] = React.useState(false);

  function changeLabel(e) {
    setEditLabel(true);
  }

  function handleLabel(e) {
    let value = e.target.id;
    if (value === "save") {
      console.log("hi");
    }
  }

  return (
    <>
      {editLabel ? (
        <div>
          <input></input>
          <button id="cancel" onClick={handleLabel}>
            Cancel
          </button>
          <button id="save" onClick={handleLabel}>
            Save
          </button>
        </div>
      ) : (
        <label htmlFor={props.id} onClick={changeLabel}>
          {props.name}
        </label>
      )}
    </>
  );
};

export default LabelRename;
