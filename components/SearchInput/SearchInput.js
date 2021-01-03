import React from "react";
import styles from "./searchInput.module.css";
import SearchRounded from "@material-ui/icons/SearchRounded";
function SearchInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <SearchRounded className={styles.searchInput} />
      <input className={styles.input} {...rest} />
    </div>
  );
}

export default SearchInput;
