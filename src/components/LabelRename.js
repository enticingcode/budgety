import React from "react";
import "../styles/LabelRename.css";

const LabelRename = (props) => {
  const [editLabel, setEditLabel] = React.useState(false);

  function changeLabel(e) {
    setEditLabel(true);
  }

  // need to change state name of expense below;
  function handleChange(e) {
    let currentLabelVal = e.target.value;
    let nextSibling = e.target.nextSibling;

    console.log(e.target);

    props.setExpenses((prevArray) => {
      return prevArray.map((obj) => {
        //this comparison needs a creative method of implementation.
        //using sibling element which is the input of expense number
        if (obj.id === nextSibling.id) {
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
          <button className="rename-option" id="save" onClick={handleLabel}>
            &#10003;
          </button>
          <input
            className="rename-input"
            value={props.name}
            onChange={handleChange}
          ></input>
        </>
      ) : (
        <label htmlFor={props.id} onClick={changeLabel}>
          {props.name}
        </label>
      )}
    </>
  );
};

export default LabelRename;
