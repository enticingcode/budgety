import React from "react";
import editImg from "../assets/images/edit.svg";

function IncomeModules(props) {
  const { incomeSources, setIncomeSources } = props;

  function handleChange(e) {
    let value = e.target.value;
    let nodeTarget = e.target.id;

    //Check for number value, if NaN return;
    if (isNaN(value)) return;

    //Use input target id, to reference income object in state array, and update matching obj
    setIncomeSources((prev) => {
      return prev.map((obj) => {
        if (obj.id === nodeTarget) {
          return { ...obj, income: value };
        }
        return obj;
      });
    });
  }

  let incomePrompts = incomeSources.map((item) => {
    return (
      <div
        className="saved-input d-flex flex-column align-items-center mx-2 w-25 py-2 px-2 position-relative"
        key={item.id}
        id={item.id}
      >
        <h5 className="text-decoration-underline">Income</h5>

        <span>{item.income}</span>
        <div className="edit-png position-absolute top-0 end-0 p-1">
          <img width="30px" alt="edit icon" src={editImg}></img>
        </div>
      </div>
    );
  });

  return <>{incomePrompts}</>;
}

export default IncomeModules;

// function addIncomeInput(e) {
//   e.preventDefault();
//   setIncomeSources((prev) => {
//     console.log(prev);
//     return [...prev, { income: "", id: uniqid() }];
//   });
// }
