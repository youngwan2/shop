import React from "react";
import styles from "./Category.module.css";
import { ProductByCategoryType } from "../../components/Types/Products";
import { useNavigate } from "react-router-dom";
import { ItemsType } from "../../components/Types/ItemsType";

const Electronics = ({ productByCategory }: ProductByCategoryType) => {
  const navigation = useNavigate();

  return (
    <>
      <div
        style={{
          opacity:"0.8",
          position: 'fixed',
          left:"50%", top:"70%",
          transform:"translate(-50%,-50%)",
          width:"100%", height:"80%",
          backgroundImage: "url('./category/monitor.png')",
          backgroundPosition: "center",
          backgroundRepeat:"no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <section className="Products" id="Products">
        <div className={styles.products_container}>
          <h1 className={styles.title}>Electronics</h1>
          <div className={styles.items_box}>
            {Array.isArray(productByCategory) ? (
              productByCategory.map((items: ItemsType) => {
                return (
                  <div
                    onClick={() => {
                      navigation(`/detail/${items.id}`);
                    }}
                    key={items.id}
                    className={styles.items}
                  >
                    <img
                      className={styles.product_img}
                      style={{
                        width: "70%",
                        height: "20vw",
                        maxWidth: "250px",
                        maxHeight: "200px",
                      }}
                      src={items.image}
                      alt="product_img"
                    ></img>
                    <div className={styles.contents}>
                      <h4>{items.title}</h4>
                      <div>${items.price.toFixed(2)} </div>
                      <div>
                        {items.rating.rate}
                        {"(" + items.rating.count + " persons)"}
                      </div>
                      <div>{items.category}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <img
                src={process.env.PUBLIC_URL + "spinner.gif"}
                alt="spinner"
              ></img>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Electronics;
