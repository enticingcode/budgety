import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { select } from "../features/utilities/selectItems";
import { isModalActive } from "../features/utilities/modalSlice";
import InputModal from "./InputModal";

function AddNew(props) {
  const dispatch = useDispatch();
  // const isInputModalActive = useSelector((state) => state.modal.isActive);


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
  // Correction the issue seems to be I am both rendering it here, and in RouteSwitch.


  return (
    <>
      <svg onClick={() => dispatch(isModalActive({isActive: true, category:props.moduleName}))} className="modify-entries" fill="grey" xmlns="http://www.w3.org/2000/svg" height="24"viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      {/* {isInputModalActive && <InputModal category={props.moduleName} />} */}
      </>
  );
}

export default AddNew;
