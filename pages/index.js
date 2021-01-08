import React, { useState, useEffect } from "react";
import Head from "next/head";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyWords, setKeyWords] = useState("");
  const [filterCountries, setFilterCountries] = useState(countries);

  const filteredSearch = () => {
    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(keyWords) ||
        country.region.toLowerCase().includes(keyWords) ||
        country.subregion.toLowerCase().includes(keyWords)
    );
    setFilterCountries(filtered);
  };

  const onInputChange = (e) => {
    setKeyWords(e.target.value.toLowerCase());
    filteredSearch();
  };

  return (
    <Layout className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} Countries</div>
        <div className={styles.input}>
          <SearchInput
            onInputChange={onInputChange}
            value={keyWords}
            filteredSearch={filteredSearch}
            type="text"
            placeholder="Filter by Name, Region, Subregion"
          />
        </div>
      </div>
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
