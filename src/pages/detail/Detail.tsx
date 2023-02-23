import React from "react";
import axios from "axios";
import styles from "./Detail.module.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { itemsType } from "../../components/Products";
import Taps from "../../components/TapsComponents/Taps";
import Modal from "../../components/modal(detail)/Modal";

const Detail = () => {
  const [modalState, setModalState] = useState(false);

  const { id } = useParams();
  const [items, setItems] = useState<itemsType>();
  const [action, setAction] = useState("");
  const detailItem = useCallback(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setItems(response.data));
  }, [id]);

  useEffect(() => {
    detailItem();
  }, [detailItem]);

  function addClass() {
    setAction(styles.action);
    if (action === styles.action) {
      setAction("");
    }
  }

  return (
    <>
      {/* 디테일 페이지 배경 이미지 */}
      <img
        style={{ position: "absolute", opacity: "0.5" }}
        src={process.env.PUBLIC_URL + "/wave2.png "}
        alt="detail_background"
      ></img>

      <div className="Detail">
        {items !== undefined ? (
          <div className={styles.item_container}>
            {/* 디테일 이미지 */}
            <img
              onClick={addClass}
              alt="detail_image"
              src={`${items.image}`}
              className={`${styles.image} ${action}`}
            ></img>
            {/* 디테일 상품 내용들 */}
            <div className={styles.contents}>
              <h2 className={styles.title}>{items.title}</h2>
              <div className={styles.price}>
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faCoins}
                ></FontAwesomeIcon>
                {items.price}
              </div>
              <div className={styles.vote}>
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faStar}
                ></FontAwesomeIcon>
                {items.rating.rate}
                {"(" + items.rating.count + " number of people)"}
              </div>
              {/* 디테일 상품 설명 내용ㄱ  */}
              <div className={styles.description}>{items.description}</div>
              <div>
                {/* 구매/장바구니 추가 버튼 */}
                <button className={styles.purchaseBtn}>Purchase</button>
                <button
                  onClick={() => {
                    setModalState(true);
                  }}
                  className={styles.putBtn}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          // 로딩 스피너
          <img
            className={styles.loadingImage}
            src={process.env.PUBLIC_URL + "/spinner.gif"}
            alt="spinner"
          ></img>
        )}
      </div>
      <Taps />
      {/* modalState 가 true 라면 실행 */}
      {modalState && (
        <Modal
          modalState={modalState}
          onClose={setModalState}
          items={items!}
        ></Modal>
      )}
    </>
  );
};

export default Detail;
