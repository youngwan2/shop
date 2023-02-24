import React from "react";
import styles from "./Cart.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartIdCommunicator } from "../../slice/cartDelSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState<any[]>([]);

  type cartDelType = {
    cartDel: {
      id: number;
    };
  };
  const cartId = useSelector<cartDelType>((state) => {
    return state.cartDel.id;
  });

  // 장바구니 아이템 삭제
  useEffect(() => {
    if (cartId !== 0) {
      axios
        .delete(
          `https://my-json-server.typicode.com/youngwan2/shop/cart/${cartId}`
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      window.location.replace(`${window.location.href}`);
    }
  }, [cartId]);

  // 장바구니 아이템 추가
  const getItem = async () => {
    await axios
      .get("https://my-json-server.typicode.com/youngwan2/shop/cart")
      .then((res) => setItem(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="Cart">
      <table className={styles.table} width={"80%"}>
        <thead>
          <tr className={styles.tr}>
            <th>ID</th>
            <th>PRODUCT(Size)</th>
            <th>COUNT</th>
            <th>TOTAL</th>
            <th>ETC</th>
          </tr>
        </thead>
        <tbody>
          {item
            ? item.map((cart) => {
                return (
                  <tr key={Math.random() * 10000} className={styles.tr}>
                    <td width={50}>{cart.id}</td>
                    <td className={styles.product}>
                      <img
                        className={styles.product_img}
                        style={{ display: "inline-block" }}
                        src={`${cart.product_image}`}
                        alt="item_image"
                      ></img>
                      <div style={{ padding: "12px" }}>
                        {cart.product_name} ({cart.size})
                      </div>
                    </td>
                    <td>{cart.count}</td>
                    <td width={100}>{cart ? "$" + cart.total : 0}</td>
                    <td width={100}>
                      <button className={styles.payBtn}>V</button>
                      <button
                        onClick={() => {
                          dispatch(cartIdCommunicator(cart.id));
                        }}
                        className={styles.cancelBtn}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
