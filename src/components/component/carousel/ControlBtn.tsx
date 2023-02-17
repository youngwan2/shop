import React, { useState } from "react";
import styles from "../carousel/ControlBtn.module.css";
import { useEffect, useCallback} from "react";

interface ControlBtnType {
  setPageNum: Function;
}

const ControlBtn = ({ setPageNum }: ControlBtnType) => {
  const [btn] = useState([0, 1, 2, 3]);
  const [activePage, setActivePage] = useState(0);
  const [active] = useState("");

  const activeFun = useCallback(() => {
    for (let i = 0; i < btn.length; i++) {
      document.querySelectorAll(".btn")[i].classList.remove("active");
    }
    document.querySelectorAll(".btn")[activePage].classList.add("active");
  }, [btn.length, activePage]);

  // 마운트 이후 activeFun 함수를 실행시킨다
  // 단, 이대로 실행하게 되면 의존성 배열이 실행될 때 마다 반복되므로
  // 무한 루프에 빠질 수 있다. 따라서 불필요한 렌더링을 막기 위해 useCallback과 같이 사용한다.
  useEffect(() => {
    activeFun();
  }, [activeFun]);

  return (
    <ul className={styles.ControlBtn}>
      {btn.map((pageNum) => {
        return (
          <li
            key={Math.random() * 10000}
            onClick={() => {
              setPageNum(pageNum);
              setActivePage(pageNum);
            }}
            className={`btn ${active}`}
          ></li>
        );
      })}
    </ul>
  );
};

export default ControlBtn;
