import {
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
} from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./countreis.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  } else if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const ArrowComp = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

function CountriesTable({ countries }) {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderdCountries = orderBy(countries, value, direction);
  const countriesData = orderdCountries.slice(0, 10);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else if (direction === "asc") {
      setDirection("desc");
    }
  };

  const setValueAndCallDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndCallDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <ArrowComp direction={direction} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => setValueAndCallDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <ArrowComp direction={direction} />}
        </button>
      </div>
      {countriesData.map((country) => (
        <Link href={`/country/${country.alpha2Code}`} key={country.alpha3Code}>
          <div className={styles.rows}>
            <div className={styles.rows_name}>{country.name}</div>
            <div className={styles.rows_population}>{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountriesTable;
