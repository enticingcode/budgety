import React from "react";

const CPIData = () => {
  const [cpiData, setCpiData] = React.useState(null);

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
        setCpiData(response[0].yearly_rate_pct.toFixed(1));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="m-5">
      <h2>Yearly Inflation Percentage:</h2>
      {cpiData ? <p>{cpiData}%</p> : <p>Fetching Data...</p>}
    </div>
  );
};

export default CPIData;
