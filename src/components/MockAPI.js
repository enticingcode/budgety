import React from "react";

const MockAPI = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: "Income",
            income: 300,
            id: "3ku"
        })
    }, 1000)
})




export default MockAPI;
