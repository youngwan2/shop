import React, { useState, useEffect } from "react";
import styles from "./Inquiry.module.css";
import UserQna from "./UserQna";

const Inquiry = () => {
  type UserReqType = [
    {
      id: number;
      title: string;
      author: string;
      content: string;
      date: string;
    }
  ];
  const [hide, setHide] = useState(false);
  const [userReq, setUserReq] = useState<UserReqType>();
  console.log(userReq);

  useEffect(() => {
    fetch("http://localhost:3001/inquiry")
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
      })
      .then((result) => setUserReq(result));
  }, []);

  return (
    <>    <section className="Inquiry">
      <h1 id={styles.title}>Inquiry</h1>
      <article id={styles.table_outer_container}>
        <button
          className={styles.registrationBtn}
          style={{ width: "150px", marginTop: "30px"}}
          onClick={() => {
            setHide(true);
          }}
        >
          Registration
        </button>
        <table id={styles.inquiry_table}>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>No</th>
              <th style={{ width: "400px" }}>title</th>
              <th style={{ width: "100px" }}>Author</th>
              <th style={{ width: "150px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {userReq &&
              userReq.map((req) => {
                return (
                  <tr
                    key={Math.random()*10000} 
                    className={styles.table_row}>
                    <td>{req.id}</td>
                    <td>{req.title}</td>
                    <td>{req.author}</td>
                    <td>{req.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </article>
      {hide ? <UserQna onHide={setHide}></UserQna> : null}
    </section>
    <img
     className={styles.inquiry_background} 
      src={process.env.PUBLIC_URL +"../inquiry/qna.png"} alt="inquiry_background"></img>
    </>

  );
};

export default Inquiry;
