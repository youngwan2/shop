import React from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsersType } from "../../components/Types/getUsersType";
import { getUsername } from "../../slice/usernameSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idx, setIdx] = useState<number>();
  const [getUsers, setGetUsers] = useState<getUsersType>();

  // 서버에서 등록된 유저정보를 받아옴
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => {
        if (res.ok === true) return res.json();
      })
      .then((result) => setGetUsers(result));
  }, [getUsers]);

  const loginCheck = () => {
    //유저 아이디가 존재한다면 해당 값이 위치한 인덱스를 반환, 없으면 -1 반환
    let copy;
    if (getUsers)
      copy = getUsers.findIndex((result) => {
        return result.username === username;
      });
    setIdx(copy);

    //-1 이라면 아이디가 존재하지 않는다는 안내 메시지를 띄운다.
    if (idx) if (idx === -1) return alert(" Username does not exist.");

    //앞서 통과된 유저아이디가 위치하는 인덱스의 비밀번호가 서로 일치하면 실행
    if (getUsers && idx)
      if (getUsers[idx].password === password) {
        const json = JSON.stringify({
          username: username,
          login: true,
          id: getUsers[idx].id,
        });
        sessionStorage.setItem("userInfo", json);

        dispatch(getUsername(username));
        navigate("/");
      } else return alert("Passwords do not match");
    return;
  };

  return (
    <section className={styles.login_container}>
      <form className={styles.login_form}>
        <div className={styles.login_form_inner_con}>
          <h1 className={styles.title}>Welcome!</h1>
          {/* 유저 아이디 */}
          <div>
            <input
              minLength={5}
              type="text"
              name="username"
              id={styles.username}
              placeholder="username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 패스워드 */}
          <div>
            <input
              minLength={5}
              type="password"
              name="password"
              id={styles.password}
              placeholder="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span></span>
          </div>
          {/* 로그인 버튼 */}
          <div className={styles.login_etc}>
            <p onClick={loginCheck} className={styles.login_btn}>
              Login
            </p>
            {/* 회원가입 안내 및 이동 버튼 */}
            <p
              className={styles.signup_btn}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Would you like to join?
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
