import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')

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
              onChange={(e)=>{
                setUsername(e.target.value)
              }}
              required
            />
            <span></span>
          </div>
          {/* 로그인 버튼 */}
          <div className={styles.login_etc}>
            <p className={styles.login_btn}
              onClick={()=>{
                navigate('/')
                sessionStorage.setItem('login',`{"login":true, "username" :"${username}"}`)
              }}
            >
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
