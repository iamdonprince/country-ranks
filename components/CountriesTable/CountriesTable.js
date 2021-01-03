import React from "react";
import styles from "./countreis.module.css";

function CountriesTable({ countries }) {
  const countriesData = countries.slice(0, 10);
  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>
        </button>
        <button className={styles.heading_population}>
          <div>Population</div>
        </button>
      </div>
      {countriesData.map((country) => (
        <div className={styles.rows}>
          <div className={styles.rows_name}>{country.name}</div>
          <div className={styles.rows_population}>{country.population}</div>
        </div>
      ))}
    </div>
  );
}

export default CountriesTable;
