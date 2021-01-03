import Head from "next/head";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
  console.log(countries);
  return (
    <Layout className={styles.container}>
      <div className={styles.counts}>Found {countries.length} Countries</div>
      <SearchInput
        type="text"
        placeholder="Filter by Name, Region, Subregion"
      />
      <CountriesTable countries={countries} />
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
