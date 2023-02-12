import React from "react";
import styles from "./Inquiry.module.css";

const Inquiry = () => {
  return (
    <section className="Inquiry">
      <h1 id={styles.title}>Inquiry</h1>
      <article id={styles.table_outer_container}>
        <h2>Q&A</h2>
        <table id={styles.inquiry_table}>
          <thead>
            <tr>
              <th style={{width:"50px"}}>No</th>
              <th style={{width:"400px"}}>title</th>
              <th style={{width:"100px"}}>Author</th>
              <th style={{width:"150px"}}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>sizeUp</td>
                <td>kim</td>
                <td>2023-02-12</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Inquiry;
