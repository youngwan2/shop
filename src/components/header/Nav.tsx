import styles from "./Nav.module.css";
import CartModal from "../cart/CartModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingBag,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { send } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../API/useFetch";
import axios from "axios";

const Nav = () => {
  type LoginUserType = {
    username: string;
    login: boolean;
    id: string;
  };
  const [action, setAction] = useState("");
  const [select, setSelect] = useState("");
  const [appear] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  // const [getError,setGetError] = useState();

  const [loginUser, setLoginUser] = useState<LoginUserType>();

  //로그아웃 클릭 시 세션스토리지 내 데이터 초기화 및 로그인 화면을 보여준다.
  function logoutHandler() {
    navigate("/login");
    sessionStorage.clear();
    window.location.reload()
  }

  // 레듀서 영역
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 유저 로그인 상태 확인을 위해 세션스토리지 내에서 state 정보 조회()
  const userInfoJson = sessionStorage.getItem("login");

  useEffect(() => {
    if (userInfoJson) {
      const userInfo = JSON.parse(userInfoJson);
      setLoginUser(userInfo);
    }
  }, [userInfoJson]);

  // 三 버튼을 클릭하면 action에 클래스 action 이 할당된다.
  // 만일 action 변수가 빈문자열이 아닌 경우에는 빈문자열을 action 변수에 할당
  // 이를 통해 클릭 시 카테고리 메뉴가 숨겨지고 나타난다.
  const open = () => {
    action === "" ? setAction(styles.action) : setAction("");
  };

  // 장바구니 아이콘을 클릭하면 클래스가 추가되면서 해당 클래스 선택자에
  // 적용된 CSS 코드가 실행된다(장바구니 모달창의 온/오프).
  const cart = () => {
    setCartActive(!cartActive);
  };

  //GET API(카테고리 정보를 가져온다.) 영역
  const categories = useFetch("https://fakestoreapi.com/products/categories");

  // 유저가 선택한 카테고리에 해당하는 상품 목록을 가져온다.
  const getProductByCategory = useCallback(
    async (select: string) => {
      if (select)
        await axios
          .get(`https://fakestoreapi.com/products/category/${select}`)
          .then((response) => response.data && dispatch(send(response.data)))
          .catch((error) => console.error(error));
    },
    [dispatch]
  );

  useEffect(() => {
    setTimeout(() => {
      getProductByCategory(select);
    }, 100);
  }, [getProductByCategory, select]);

  return (
    <>
      <div onClick={open} className={styles.category_bars}>
        {" "}
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={styles.menu_layout}></div>

{/* 三 메뉴 아이콘 클릭 시 내부 검색창(페이크) */}
      <div className={"Nav"}>
        <article className={`${styles.inner_search_con} ${action}`}>
          <label htmlFor="inner_search"></label>
          <input
            type={"text"}
            className={styles.inner_search}
            id="inner_search"
            placeholder="Keyword Search"
          ></input>
        </article>
        <ul className={`${styles.menu} ${action}`}>
          {categories !== undefined ? (
            categories.map((cate) => {
              return (
                <li key={Math.random() * 1000} className={styles.menu_list}>
                  <Link
                    onClick={() => {
                      setSelect(cate);
                    }}
                    className={styles.link}
                    style={{ textDecoration: "none" }}
                    to={`/${cate}`}
                  >
                    {cate}
                  </Link>
                </li>
              );
            })
          ) : (
            <div className={styles.get_cate_error}>data load failed...</div>
          )}
        </ul>
      </div>

{/* 검색창(페이크) */}
      <article className={styles.outer_search_con}>
        <div>
          <label htmlFor="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
          <input
            id={"search"}
            placeholder="Keyword Search"
            className={styles.outer_search}
          ></input>
        </div>
      </article>

      <div className={styles.cartLoginCon}>
        {appear === false ? (
          <article id={styles.welcome_modal}>
            <span style={{ borderBottom: "1px solid white" }}>
              {loginUser && "Hi ! " + loginUser.username}
            </span>
          </article>
        ) : null}
        <article>
          <FontAwesomeIcon
            className={styles.cart_icon}
            icon={faShoppingBag}
            onClick={cart}
          ></FontAwesomeIcon>
        </article>

        {/* 로그인 유저 정보가 존재한다면 Login => Logout 으로 설정 */}
        {Boolean(loginUser?.login) === false ? (
          <article
            className={styles.login}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </article>
        ) : (
          <article className={styles.login} onClick={logoutHandler}>
            Logout
          </article>
        )}
        <CartModal
          cartActive={cartActive}
          setCartActive={setCartActive}
        ></CartModal>
      </div>
    </>
  );
};

export default Nav;
