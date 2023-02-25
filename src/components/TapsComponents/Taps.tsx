import React from "react";
import styles from "../TapsComponents/Taps.module.css";
import Description from "./description/Description";
import Reviews from "./reviews/Reviews";
import Inquiry from "./inquiry/Inquiry";
import { useState } from "react";

const Taps = () => {
  // taps 컴포넌트
  const [taps] = useState([<Description />, <Reviews />, <Inquiry />]);
  const [count, setCount] = useState(0);
  // taps 버튼 타이틀
  const [tapTitle] = useState(["Description", "Reviews", "Inquiry"]);

  return (
    <article className="Taps">
      <div className={styles.detail_taps}>
        {tapTitle.map((tapsTitle, i) => {
          return (
            <button
              key={Math.random() * 10000 * i}
              style={
                tapTitle[count] === tapsTitle
                  ? { background: "rgb(199, 9, 72)"}
                  : { background: "black" }
              }
              onClick={() => {
                setCount(i);
              }}
            >
              {tapsTitle}
            </button>
          );
        })}
      </div>
      <section>{taps[count]}</section>
    </article>
  );
};

export default Taps;
