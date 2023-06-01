"use client";
import styles from "./header.module.css";
import { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
interface inputValue {
  target: { value: string };
}

export default function SearchBar() {
  const [query, Setquery] = useState("");

  const NewSearchquery = (evt: inputValue): void => {
    Setquery(evt.target.value);
  };
  return (
    <div className={styles.searchbarcontainer}>
      <input
        type="text"
        onChange={NewSearchquery}
        value={query}
        placeholder="Search a Product"
      />

      <a href={query.length ? `/?query=${query}` : "#"}>
        <FaSearchengin />
      </a>
    </div>
  );
}
