import React from "react";
import styles from "./Reviews.module.css";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Reviews = () => {
  type updatePageType = { page: { value: number } };
  // 유저가 선택한 페이지 번호를 스토어에서 가져온 후 postPage 변수에 할당
  let postPage = useSelector<updatePageType>((state) => {
    return state.page.value;
  }) as number;

  type reviewsType = {
    id: number;
    username: string;
    image: string;
    review: string;
  };
  const [reviews, setReviews] = useState<reviewsType[]>([]);

  // 유저가 선택한 postPage 에 해당하는 리뷰 정보를 get 요청해서 얻어온다.
  // 얻어온 리뷰 데이터를 reviews 변수에 할당
  const reviewFetch = async (page: number) => {
    await axios
      .get(
        `http://localhost:3001/reviews?_page=${page}&_limit=10`
      )
      .then((res) => {
        return setReviews(res.data);
      });
  };

  useEffect(() => {
    reviewFetch(postPage);
  }, [postPage]);

  return (
    <>
      <article className="Reviews">
        {/* get 요청으로 얻어온 해당 리뷰 데이터를 그려준다. */}
        {reviews !== undefined
          ? reviews.map((_, i) => {
              return (
                <section key={Math.random()} className={styles.review_con}>
                  <img
                    src={process.env.PUBLIC_URL + "/profile.png"}
                    className={styles.image}
                    alt="user_profile"
                  ></img>
                  <div className={styles.content_con}>
                    <p>{reviews[i].username}</p>
                    <p>{reviews[i].review}</p>
                  </div>
                </section>
              );
            })
          : null}
      </article>
      <Pagination />
    </>
  );
};

export default Reviews;
