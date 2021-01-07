import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import Image from "next/image";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

function Country({ country }) {
  const [borders, setBorders] = useState([]);
  console.log(country);
  const router = useRouter();
  const getBorders = async () => {
    const countryNeighbour = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(countryNeighbour);
  };
  useEffect(() => {
    getBorders();
  }, [country]);
  return (
    <Layout title={country.name}>
      <div className={styles.overview_panel}>
        <Image width={500} height={500} src={country.flag} alt={country.name} />

        <h1 className={styles.overview_name}>{country.name}</h1>
        <div className={styles.overview_region}>{country.region}</div>

        <div className={styles.overview_numbers}>
          <div className={styles.overview_population}>
            <div className={styles.overview_value}>{country.population}</div>
            <div className={styles.overview_label}>Population</div>
          </div>
          <div className={styles.overview_area}>
            <div className={styles.overview_value}>{country.area}</div>
            <div className={styles.overview_label}>Area</div>
          </div>
        </div>
      </div>
      <div className={styles.details_panel}>
        <h4 className={styles.details_panel_heading}>Details</h4>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Capital</div>
          <div className={styles.details_panel_value}>{country.capital}</div>
        </div>
        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Currencies</div>
          <div className={styles.details_panel_value}>
            {country.currencies.map(({ name }) => name)}
          </div>
        </div>
        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Native name</div>
          <div className={styles.details_panel_value}>{country.nativeName}</div>
        </div>

        <div className={styles.details_panel_row}>
          <div className={styles.details_panel_label}>Gini</div>
          <div className={styles.details_panel_value}>{country.gini} %</div>
        </div>

        <div className={styles.details_panel_borders}>
          <div className={styles.details_panel_borders_label}>
            Neighbouring Countries
          </div>
          <div className={styles.details_panel_borders_country}>
            {borders.map(({ flag, name }) => (
              <div className={styles.details_panel_borders_country}>
                <Image width={120} height={120} src={flag} alt={name} />

                <div className={styles.details_panel_borders_name}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`);
  const country = await res.json();
  const paths = country.map((data) => {
    return { params: { id: data.alpha2Code } }; // See the "paths" section below
  });
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );
  const country = await res.json();
  return {
    props: {
      country,
    },
  };
};

export default Country;
