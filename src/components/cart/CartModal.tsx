import React, { useEffect, useState } from "react";
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

  // 장바구니 아이템 추가
  const getItem = () => {
    axios
      .get("https://my-json-server.typicode.com/youngwan2/shop")
      .then((res) => setItems(res.data))
      .catch((error) => console.error(error));
  };

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
