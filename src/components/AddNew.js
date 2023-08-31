import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { select } from "../features/utilities/selectItems";
import { changeActiveStatus } from "../features/utilities/modalSlice";
import InputModal from "../components/InputModal";

function AddNew(props) {
  const dispatch = useDispatch();
  // const { setIsSelectActive } = props;
  // <div className="bullet-menu" onClick={() => setIsSelectActive(prev => !prev)}>
  const [isModalActive, setIsModalActive] = React.useState(false);

  function checkTargetElement(e) {
      e.preventDefault();
      console.log();
  }

  // console.log(props.moduleName);

  return (
    <>
      <svg onClick={() => setIsModalActive(true)} className="plus-sign" fill="grey" xmlns="http://www.w3.org/2000/svg" height="24"viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      {isModalActive && <InputModal setIsModalActive={setIsModalActive} cat={props.moduleName} />}
      </>
  );
}

export default AddNew;