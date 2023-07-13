import { useEffect, useState } from "react";
import styles from "./CartModal.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartModalType {
  cartActive: boolean;
  setCartActive: Function;
}

const CartModal = ({ cartActive, setCartActive }: CartModalType) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  // 추가된 장바구니 아이템 읽어와서 items 변수에 할당한다.
  const getItem = async () => {
    await axios
      .get("http://localhost:3001/cart")
      .then((res) => setItems(res.data))
      .catch((error) => console.error(error));
  };

  /* 컴포넌트가 마운트 되고 한 번만 getItem 함수를 호출한다. */
  useEffect(() => {
    getItem();
  }, []);

  return (
    <article
      onClick={() => {
        setCartActive(false);
      }}
      style={
        cartActive
          ? { opacity: 1, visibility: "visible" }
          : { opacity: 0, visibility: "hidden" }
      }
      className={`${styles.CartModal}`}
    >
      <h3
        onClick={() => {
          navigate("/cart");
        }}
        className={styles.cartShift}
      >
        Shortcuts
      </h3>
      {items.map((itemEl, i) => {
        return (
          <div
            key={Math.random() * 10000 * i}
            onClick={() => {
              navigate(`/detail/${itemEl.product_id}`);
            }}
            className={styles.product_info}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `
          url(${itemEl.product_image})`,
            }}
          >
            <div className={styles.product_content}>
              <p>상품보러가기</p>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default CartModal;
