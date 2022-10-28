import React from "react";
import CPIData from "./APICalls/CPIData";
import BuyingPowerAPI from "./APICalls/BuyingPowerAPI";
import NewsAPI from "./APICalls/NewsAPI";
import MarketIndices from "./APICalls/MarketIndices";

const WeeklyForecasts = () => {
  return (
    <>
      <section className="module n-mod d-flex flex-column m-3 rounded bg-light">
        <h2>Market Indices</h2>
        <MarketIndices />
        <div className="d-flex align-items-start cpi-data">
          {/* <BuyingPowerAPI />
          <CPIData /> */}
        </div>
      </section>

      <section className="module n-mod d-flex flex-column m-3 rounded bg-light">
        <h2>News</h2>
        <div className="d-flex align-items-start cpi-data">
          <NewsAPI />
        </div>
      </section>
    </>
  );

};

export default WeeklyForecasts;
