"use strict";

const renderCountry = require("./renderCountryModule");

const getCountryData = (country) => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            //throw new Error("Test error");
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];
            //console.log(neighbour);
            if (!neighbour) return;
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => response.json())
        .then((data) => {
            throw new Error("Test error"); // Temporarily add this to test error handling
            renderCountry(data[0]);
        })
        .catch((err) => {
            console.error(`${err} 💥💥💥`);
        })
        .finally(() =>
            console.log(
                "Operation completed. This runs regardless of the promise's outcome."
            )
        );
};

getCountryData("portugal");
