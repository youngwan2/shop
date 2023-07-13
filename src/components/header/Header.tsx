import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="Header">
      <h2
        id={styles.title}
        onClick={() => {
          navigate("/");
        }}
      >
        Modren
      </h2>
      <Nav />
    </header>
  );
};

export default Header;
