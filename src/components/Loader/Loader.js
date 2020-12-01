import React from "react";
//eslint-disable-next-line
import styles from "./styles.css";
import loading from "../../public/images/loader.gif";

export default function Loader() {
  return (
    <div className="loader-container">
      <img src={loading} className="loader" alt="Carregando" />
    </div>
  );
}
