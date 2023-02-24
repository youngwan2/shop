import React from "react";
import styles from "./Response.module.css";


// 판매자 응답 영역 나타냄.
interface ResponseType {
  open: boolean;
  setOpen: Function;
  userReq: any[];
  index: number;
}

const Response = ({ open, setOpen, userReq, index }: ResponseType) => {
  return (
    <section
      style={
        open === true
          ? { opacity: "1" }
          : { visibility: "hidden", opacity: "0", transform: "scale(0.1)" }
      }
      className={styles.Response}
    >
      <article className={styles.response_inner_con}>
        <h1 className={styles.title}>answer</h1>
        <div className={styles.Q_area}>
          <h3>
            {"U."}{" "}
            <span style={{ fontWeight: "400" }}>{userReq[index].author}</span>
          </h3>
          <h3 style={{ paddingTop: "1rem" }}>
            {"Q."}{" "}
            <span style={{ fontWeight: "400" }}>{userReq[index].title}</span>
          </h3>

          <h3 className={styles.D_title}>{"D."}</h3>
          <p className={styles.detail_content}>{userReq[index].content}</p>
        </div>

        {/* 판매자 답변 */}
        <div className={styles.A_area}>
          <h3>A.</h3>
          <p>
            판매자가 응답하는 영역.{" "}
          </p>
        </div>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className={styles.close_btn}
        >
          Close
        </button>
      </article>
    </section>
  );
};

export default Response;
