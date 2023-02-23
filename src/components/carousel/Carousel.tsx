import React, { useState } from "react";
import styles from "../carousel/Carousel.module.css";
import ControlBtn from "./ControlBtn";

const Carousel = () => {
  let [pageNum, setPageNum] = useState(0);

  return (
    <>
    {/* pageNum 이 증가 및 감소할 때 마다 페이지 전환 */}
      <article
        style={{ transform: `translate(${-100 * pageNum}vw)` }}
        className={styles.Carousel}
      >
        {[0, 1, 2, 3].map((image) => {
          return (
            <div key={Math.random() * 10000} className={styles.item_con}>
              <img
                className={styles.item}
                src={
                  process.env.PUBLIC_URL + `./banner_image/carousel${image}.jpg`
                }
                alt="banner_image"
              ></img>
            </div>
          );
        })}
      </article>
      {/* pageNum 를 컨트롤 하는 컴포넌트로 setPageNum 함수를 전달 */}
      <ControlBtn setPageNum={setPageNum} />
    </>
  );
};

export default Carousel;
