import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React from "react";
import styles from "./countreis.module.css";

const orderBy = (countries, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  } else if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }
  return countries;
};

const ArrowComp = (direction) => {
  if (direction === "asc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUp color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDown color="inherit" />
      </div>
    );
  }
};

function CountriesTable({ countries }) {
  const countriesData = countries.slice(0, 10);
  const orderdCountries = orderBy(countriesData, "desc");
  console.log(countries);
  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>
          <ArrowComp />
        </button>
        <button className={styles.heading_population}>
          <div>Population</div>
          <ArrowComp />
        </button>
      </div>
      {orderdCountries.map((country) => (
        <div className={styles.rows} key={country.alpha3Code}>
          <div className={styles.rows_name}>{country.name}</div>
          <div className={styles.rows_population}>{country.population}</div>
        </div>
      ))}
    </div>
  );
}

export default CountriesTable;
