import React from "react";
import styles from "./Pagination.module.css";
function Pagination({
  currentPage,
  countryPerPage,
  changePage,
  total,
  incrementPage,
  decrementPage,
}) {
  const pages = [];

  for (let i = 1; i <= total.length / countryPerPage; i++) {
    pages.push(i);
  }
  return (
    <div className={styles.pagination}>
      <button onClick={decrementPage}>&laquo;</button>

      {pages.length ? (
        pages.map((page, i) => {
          return (
            <button
              className={`${page === currentPage ? styles.active : ""}`}
              key={i}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          );
        })
      ) : (
        <button className={styles.active}>1</button>
      )}
      <button onClick={() => incrementPage(pages.length)}>&raquo;</button>
    </div>
  );
}

export default Pagination;
