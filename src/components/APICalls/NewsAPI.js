import React, { useState } from "react";
import { uniqid } from "uniqid";
import { obj } from "./apiDataTemplate";

let datapoint = obj.data.mostPopularEntries.assets;

const NewsAPI = () => {
  const [finNews, setFinNews] = useState();

  function deployNewsSection() {
    return;
  }

  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        "X-RapidAPI-Host": "cnbc.p.rapidapi.com",
      },
    };

    fetch(
      "https://cnbc.p.rapidapi.com/news/v2/list-trending?tag=Articles&count=30",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let endpoint = response.data.mostPopularEntries.assets;
        console.log("run");
        setFinNews(
          endpoint.map((item) => {
            return (
              <a
                className="news-link text-decoration-none text-black flex-grow-1 m-2"
                target="_blank"
                href={item.url}
                key={item.id}
                rel="noreferrer"
              >
                <div
                  className="news-item d-flex flex-column border rounded p-3"
                  id={item.id}
                >
                  <p className="fs-5 fst-italic fw-bold">
                    {item.shorterHeadline}
                  </p>
                  {/* <p className="fs-6">{item.relatedTagsFilteredFormatted}</p> */}
                  <img
                    className="w-100"
                    alt="news"
                    src={item.promoImage.url}
                  ></img>
                </div>
              </a>
            );
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="news-Container d-flex flex-md-wrap">
        {finNews || "Loading..."}
      </div>
    </>
  );
};

export default NewsAPI;

// FOR OFFLINE USE
// datapoint.map((item) => {
//   return (
//     <a
//       className="news-link text-decoration-none text-black flex-grow-1 m-2"
//       target="_blank"
//       href={item.url}
//       key={item.id}
//       rel="noreferrer"
//     >
//       <div
//         className="news-item d-flex flex-column border rounded p-3"
//         id={item.id}
//       >
//         <p className="fs-5 fst-italic fw-bold">{item.shorterHeadline}</p>
//         {/* <p className="fs-6">{item.relatedTagsFilteredFormatted}</p> */}
//         <img className="w-100" alt="news" src={item.promoImage.url}></img>
//       </div>
//     </a>
//   );
// })
