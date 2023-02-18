import React, { useState, FormEvent } from "react";
import styles from "./UserQna.module.css";
import axios from "axios";

interface UserQnaType {
  onHide: Function;
  userInfo: { username: string; id: number; login: boolean };
}

const UserQna = ({ onHide,userInfo }: UserQnaType) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  //   Qna 의 등록 버튼을 클릭시 실행되는 함수
  const registerFun = () => {
    const req = {
      _id:userInfo.id,
      title: title,
      author: userInfo.username,
      content: content,
      date: new Date().toLocaleString("en-ko"),
    };

    axios("http://localhost:3001/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data:req,
    });
    // 전송과 동시에 Qna 컴포넌트를 제거한다.
    onHide(false);

    // Qna 컴포넌트를 제거 후 현재 페이지를 새로고침한다.
    window.location.replace(`${window.location.href}`)
  };



  //   자동 새로고침 방지
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        onClick={() => {
          onHide(false);
        }}
        className={styles.form_layout}
      ></div>
      <section className={styles.UserQna}>
        <form id={styles.form} onSubmit={onSubmit}>
          <h3 style={{ color: "white", paddingBottom: "5px" }}>QnA</h3>
          <input
            style={{ width: "300px", borderRadius: "5px", border: "none" }}
            type={"text"}
            placeholder="title"
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
            }}
          ></input>
          <textarea
            style={{
              borderRadius: "5px",
              border: "none",
              minWidth: "300px",
              maxWidth: "300px",
              maxHeight: "400px",
              minHeight: "400px",
              paddingLeft: "10px",
            }}
            maxLength={200}
            placeholder="Question content(max length : 200)"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button
            onClick={registerFun}
            className={styles.registrationBtn}
            style={{ width: "200px", marginTop: "30px" }}
          >
            Registration
          </button>
        </form>
      </section>
    </>
  );
};

export default UserQna;
