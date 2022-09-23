import React from "react";
import { marketObj } from "./apiDataTemplate";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

let endpoint = marketObj.ITVQuoteResult.ITVQuote;

function MarketIndices() {
  const [indices, setIndices] = React.useState();

  console.log(parseInt("-2.98%"));

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        "X-RapidAPI-Host": "cnbc.p.rapidapi.com",
      },
    };

    fetch("https://cnbc.p.rapidapi.com/market/list-indices", options)
      .then((response) => response.json())
      .then((response) => {
        let endpoint = response.ITVQuoteResult.ITVQuote;
        setIndices(
          endpoint.map((item) => {
            return (
              <div className="" key={item.symbol}>
                <p>{item.name}</p>
                <p>{item.symbol}</p>

                <>
                  <p>Low: {item.low}</p>
                  <p>High: {item.high}</p>
                  <p
                    className={
                      parseInt(item.change_pct) > 0
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    Change: {item.change_pct}
                  </p>
                </>
              </div>
            );
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={7000}
      customTransition="all 1s"
      className="w-100"
    >
      {indices || <p>Loading...</p>}
    </Carousel>
  );
}

export default MarketIndices;

// eslint-disable-next-line no-lone-blocks
{
  /* <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item> */
}
