import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // submit 버튼을 클릭하면 간단한 유효성 검사 후 서버로 유저 데이터를 전송

  return (
    <section className={styles.signup_container}>
      <form id={styles.signup_form}>
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
            />
            <span></span>
          </div>
          {/* 그 외(전송버튼, 로그인 화면으로 이동 버튼) */}
          <div id={styles.signup_etc}>
            <button id={styles.submit_btn}>submit</button>
            <p
              id={styles.prev_btn}
              onClick={() => {
                navigate("/login");
              }}
            >
              Would you like to return to the login screen?
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
