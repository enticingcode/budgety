import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { select } from "../features/utilities/selectItems";

function MoreOptions(props) {
  // const dispatch = useDispatch();
  const { setIsSelectActive } = props;


  // const [isMenuActive, setIsMenuActive] = React.useState(false);

  // let toggleMenu = () => {
  //   // console.log(isMenuActive);
  //   setIsMenuActive((prev) => !prev);
  // };


  // function selectItems() {
  //   dispatch(select());
  // };

  // When I click select on the three dot menu, popup w/ options appears.

  // When I click on select, it should allow me to select multiple items adding them to an array.
  // When I click select, it should also pop up two new options within the legend navigation(edit, delete);

  return (
    <div className="bullet-menu" onClick={() => setIsSelectActive(prev => !prev)}>
      <div>
        <span>&#x2022;</span>
        <span>&#x2022;</span>
        <span>&#x2022;</span>
      </div>
      {/* <div className={`${isMenuActive ? "bullet-active" : ""} bullet-options`}>
        <li onClick={selectItems}>Edit</li> 
         <li>Select All</li>
        <li>Deselect All</li> 
      </div> */}
    </div>
  );
}

export default MoreOptions;
