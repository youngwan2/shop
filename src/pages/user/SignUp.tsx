import React from "react";
import styles from "./SignUp.module.css";
import { useState, useEffect } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersType } from "../../components/Types/getUsersType";

const SignUp = () => {
  // 데이터베이스에서 얻어오는 유저정보의 타입지정
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [getUsers, setGetUsers] = useState<getUsersType>();

  const navigate = useNavigate();
  // submit 버튼을 클릭하면 간단한 유효성 검사 후 서버로 유저 데이터를 전송
  const signUpHandler = async () => {
    if (!username) {
      return alert("Enter your username.");
    }
    if (pwConfirm !== password) {
      return alert("The password you entered is incorrect");
    }
    //문제 없다면 유저 정보를 userInfo 객체에 저장
    const userInfo = {
      username: username,
      name: name,
      password: password,
    };
    console.log(userInfo);

    // 데이터베이스에 유저 정보가 있다면 true, 없으면 false 반환
    const filter: boolean[] = [];
    if (getUsers)
      getUsers.findIndex((users) => {
        if (users.username.includes(username)) {
          return filter.push(true);
        }
        return filter.push(false);
      });
    console.log(filter[0]);

    // false 라면 정보가 없으므로 유저 데이터를 서버로 전송
    if (!filter[0]) {
      await fetch("https://my-json-server.typicode.com/youngwan2/shop/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      navigate("/login");
    }
  };

  // 유저 정보를 마운트 이후 서버에서 받아온다.
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/youngwan2/shop/users")
      .then((res) => {
        if (res.ok === true) {
          return res.json();
        }
      })
      .then((result) => {
        return setGetUsers(result);
      });
  }, []);

  //전송 시 자동 새로고침 방지
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.signup_container}>
      <form onSubmit={onSubmit} id={styles.signup_form}>
        <div id={styles.signup_form_inner_con}>
          <h1 id={styles.title}>Sign Up</h1>
          {/* 아이디 */}
          <div>
            <input
              type="text"
              name="username"
              id={styles.username}
              placeholder="username"
              pattern="[A-Za-z0-9]{6,10}"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 이름 */}
          <div>
            <input
              type="text"
              name="name"
              id={styles.name}
              placeholder="name"
              pattern="[A-Za-z][^0-9]{4,10}"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 비밀번호 */}
          <div>
            <input
              type="password"
              name="password"
              className={styles.password}
              placeholder="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 비밀번호 재확인 */}
          <div>
            <input
              type="password"
              name="reconfirm"
              className={styles.password}
              placeholder="password reconfirm"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              required
              onChange={(e) => {
                setPwConfirm(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 그 외(전송버튼, 로그인 화면으로 이동 버튼) */}
          <div id={styles.signup_etc}>
            <button onClick={signUpHandler} id={styles.submit_btn}>
              submit
            </button>
            <p id={styles.prev_btn}>
              Would you like to return to the login screen?
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
