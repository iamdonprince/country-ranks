import {
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
} from "@material-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./countreis.module.css";
import Image from "next/image";
import Pagination from "../pagination/Pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(15);

  const orderdCountries = orderBy(countries, value, direction);

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
  //  pagination : setting page Number to show data
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // next page
  const incrementPage = (pageNum) => {
    if (currentPage < pageNum) setCurrentPage(currentPage + 1);
    return;
  };

  //  previous page
  const decrementPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    return;
  };

  //  pagination : slice data by 30 items
  const lastIndexOf = currentPage * countryPerPage;
  const firstIndexOf = lastIndexOf - countryPerPage;
  const currentCountries = orderdCountries.slice(firstIndexOf, lastIndexOf);

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
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
        <button
          className={styles.heading_area}
          onClick={() => setValueAndCallDirection("area")}
        >
          <div>
            Area(Km<sup>2</sup>)
          </div>
          {value === "area" && <ArrowComp direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndCallDirection("gini")}
        >
          <div>Gini</div>
          {value === "gini" && <ArrowComp direction={direction} />}
        </button>
      </div>
      {currentCountries.map((country) => (
        <Link href={`/country/${country.alpha2Code}`} key={country.alpha3Code}>
          <div className={styles.rows}>
            <div className={styles.rows_flag}>
              <Image
                width={80}
                height={60}
                src={country.flag}
                alt={country.name}
              />
            </div>
            <div className={styles.rows_name}>{country.name}</div>
            <div className={styles.rows_population}>{country.population}</div>
            <div className={styles.rows_area}>{country.area || 0}</div>
            <div className={styles.rows_gini}>{country.gini || 0}%</div>
          </div>
        </Link>
      ))}
      <Pagination
        countryPerPage={countryPerPage}
        total={countries}
        currentPage={currentPage}
        changePage={changePage}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
      />
    </div>
  );
}

export default CountriesTable;
