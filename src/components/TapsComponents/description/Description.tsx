import React from "react";
import styles from "./Description.module.css";

// 디테일 페이지의 상품 상세내역
const Description = () => {
  return (
    <article className="Description">
      <img
        className={styles.img}
        src={process.env.PUBLIC_URL + "/fakeDetail.png"}
        alt="detailImg"
      ></img>
    </article>
  );
};

export default Description;
