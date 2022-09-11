import React from "react";

const BuyingPowerAPI = () => {
  //   THIS CODE GETS BUYING POWER OF USD WITH DATES

  const [apiData, setAPIData] = React.useState({
    cumulativeRatePercentage: "",
    dollarsAfterInflation: "",
  });

  const [userInput, setUserInput] = React.useState({
    initialYear: "",
    initialMonth: "",
    finalYear: "",
    finalMonth: "",
    totalDollars: "",
  });

  function handleChange(e) {
    let fromDate;
    let toDate;
    let dollarAmount;

    //this is going to suck. but im going to put setUserInput for each individual case.
    //could be a better way of doing this, but I have little hours of sleep rn. smol brain moves
    if (e.target.id === "from-date") {
      fromDate = e.target.valueAsDate.toLocaleDateString().split("/");
      setUserInput((prev) => {
        return {
          ...prev,
          initialYear: parseInt(fromDate[2]),
          initialMonth: parseInt(fromDate[0]),
        };
      });
    } else if (e.target.id === "to-date") {
      toDate = e.target.valueAsDate.toLocaleDateString().split("/");
      setUserInput((prev) => {
        return {
          ...prev,
          finalYear: parseInt(toDate[2]),
          finalMonth: parseInt(toDate[0]),
        };
      });
    } else if (e.target.id === "dollar-amount") {
      dollarAmount = e.target.value;
      console.log(dollarAmount);
      setUserInput((prev) => {
        return {
          ...prev,
          totalDollars: parseInt(dollarAmount),
        };
      });
    }
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": "u-s-dollar-inflation.p.rapidapi.com",
    },
    body: `{"initialYear":${userInput.initialYear},"initialMonth":${userInput.initialMonth},"finalYear":${userInput.finalYear},"finalMonth":${userInput.finalMonth},"totalDollars":${userInput.totalDollars}}`,
  };

  console.log(options.body);

  function fetchInflationData() {
    fetch(
      "https://u-s-dollar-inflation.p.rapidapi.com/calculateBuyingPower",
      options
    )
      .then((response) => response.json())
      .then((response) => setAPIData(response))
      .catch((err) => console.error(err));
  }
  return (
    <div className="inflation-container">
      <div className="inflation-inputs">
        <p>Inflation Calculator</p>
        <label htmlFor="from-date">From:</label>
        <input
          onChange={handleChange}
          name="from-date"
          id="from-date"
          type="date"
        ></input>

        <label htmlFor="to-date">To:</label>
        <input
          onChange={handleChange}
          name="to-date"
          id="to-date"
          type="date"
        ></input>
        <label htmlFor="dollar-amount"></label>
        <div>
          $
          <input
            onChange={handleChange}
            name="dollar-amount"
            type="number"
            id="dollar-amount"
          ></input>
        </div>
        <button onClick={fetchInflationData}>Get Data</button>
      </div>
      <div className="inflation-results">
        <h3>
          Something that would have cost: ${userInput.totalDollars || "$0"}
        </h3>
        <h3>Dollars after inflation:</h3>
        <h3>{apiData.dollarsAfterInflation}</h3>
        <h3>Cumulative Rate Percentage:</h3>
        <h3>{apiData.cumulativeRatePercentage}</h3>
      </div>
    </div>
  );
};

export default BuyingPowerAPI;
