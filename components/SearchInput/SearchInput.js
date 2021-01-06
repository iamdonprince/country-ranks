import React from "react";
import styles from "./searchInput.module.css";
import SearchRounded from "@material-ui/icons/SearchRounded";
function SearchInput({ onInputChange, value, filteredSearch, ...rest }) {
  return (
    <div className={styles.wrapper}>
      <SearchRounded onClick={filteredSearch} className={styles.searchInput} />
      <input
        value={value}
        onChange={onInputChange}
        className={styles.input}
        {...rest}
      />
    </div>
  );
}

export default SearchInput;
