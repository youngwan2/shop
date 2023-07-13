import styles from "./Products.module.css";
import { ProductsType } from "./Types/Products";
import { useNavigate } from "react-router-dom";

export type itemsType = {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
  category: string;
  map: Function;
};

const Products = ({ products }: ProductsType) => {
  const navigation = useNavigate();
  return (
    <section className="Products" id="Products">
      <div className={styles.products_container}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.items_box}>
          {products !== undefined
            ? products.map((items: itemsType) => {
                return (
                  <div
                    onClick={() => {
                      navigation(`/detail/${items.id}`);
                    }}
                    key={items.id}
                    className={styles.items}
                  >
                    {/* 상품이미지 */}
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

                    {/* 상품 내용 */}
                    <div className={styles.contents}>
                      <h4>{items.title}</h4>
                      <div>$ {items.price.toFixed(2)} </div>
                      <div>
                        {items.rating.rate}
                        {"(" + items.rating.count + "명)"}
                      </div>

                      {/* 카테고리 표기 */}
                      <div>{items.category}</div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
};

export default Products;
