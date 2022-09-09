import React from "react";

const InflationAPI = () => {
  const [inflationData, setInflationData] = React.useState(null);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.REACT_APP_RAPID_API_HOST}`,
    },
  };

  React.useEffect(() => {
    fetch(
      "https://inflation-by-api-ninjas.p.rapidapi.com/v1/inflation",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response.filter((obj) => obj.country === "United States");
      })
      .then((response) => {
        setInflationData(response[0].yearly_rate_pct.toFixed(1));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="inflation-info">
      <h2>Yearly Inflation Percentage:</h2>
      {inflationData ? <p>{inflationData}%</p> : <p>Fetching Data...</p>}
    </div>
  );
};

// THIS CODE GETS BUYING POWER OF USD WITH DATES

// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': '85924744a4msh491ae7bc9487c06p10ae92jsnea2ed68178ee',
// 		'X-RapidAPI-Host': 'u-s-dollar-inflation.p.rapidapi.com'
// 	},
// 	body: '{"initialYear":2020,"initialMonth":2,"finalYear":2021,"finalMonth":6,"totalDollars":100}'
// };

// fetch('https://u-s-dollar-inflation.p.rapidapi.com/calculateBuyingPower', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
export default InflationAPI;
