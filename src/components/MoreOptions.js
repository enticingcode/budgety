import React from "react";

function MoreOptions() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);

  let toggleMenu = () => {
    console.log(isMenuActive);
    setIsMenuActive((prev) => !prev);
  };

  return (
    <div className="bullet-menu" onClick={toggleMenu}>
      <div>
        <span>&#x2022;</span>
        <span>&#x2022;</span>
        <span>&#x2022;</span>
      </div>
      <div className={`${isMenuActive ? "bullet-active" : ""} bullet-options`}>
        <li></li>
        <li></li>
        <li></li>
      </div>
    </div>
  );
}

export default MoreOptions;
