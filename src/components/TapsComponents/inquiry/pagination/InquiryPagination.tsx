import React from "react";
import styles from "./InquiryPagination.module.css";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInquiryPage } from "../../../../slice/InquiryPageSlice";

const InquiryPagination = () => {
  type newCurrentPageType = {
    inquiryPage: {
      value: number;
    };
  };
  const newCurrentPage = useSelector<newCurrentPageType>((state) => {
    return state.inquiryPage.value;
  }) as number;

  const dispatch = useDispatch();
  const [render, setRender] = useState<number[]>();

  /** 원래라면 서버로 부터 토탈페이지 정보를 전달 받아
  /* 값이 동적으로 변해야 하지만, 임시로 값을 부여함.
  /* 현재 서버에서 받아오는 데이터의 제한은 한 페이지 당 5개로 제한.
    즉, 게시글이 총 7개라면 5개는 1페이지 나머지 2개는 2페이지에 그려짐
   */
  const [totalPage] = useState(Math.ceil(3 / 5));
  console.log(totalPage);

  const pagination = useCallback(() => {
    const currentPage = newCurrentPage;
    const renderPage = 5;
    const pageGroup = Math.ceil(currentPage / renderPage);
    let lastPage = pageGroup * renderPage;
    const firstPage = lastPage - (renderPage - 1);

    let tempStore = [];
    // 총 페이지 보다 마지막페이지가 같거나 커지면
    // 마지막페이지를 총 페이지와 같게 한다.
    if (totalPage <= lastPage) lastPage = totalPage;
    for (let i = firstPage; i <= lastPage; i++) {
      tempStore.push(i);
    }
    setRender(tempStore);
  }, [newCurrentPage, totalPage]);

  useEffect(() => {
    pagination();
  }, [pagination]);

  //   이전으로 이동하는 버튼 함수
  const prevFun = () => {
    let copy = newCurrentPage;
    // 현재페이지 번호가 1보다 큰 경우일 때만 이전 페이지로 이동
    if (copy > 1) {
      copy--;
      dispatch(setInquiryPage(copy));
    }
  };

  //   다음으로 이동하는 버튼 함수
  const nextFun = () => {
    let copy = newCurrentPage;
    // 현재 페이지가 총 페이지 보다 작을 때 다음 페이지 이동
    if (copy < totalPage) {
      copy++;
      dispatch(setInquiryPage(copy));
    }
  };

  return (
    <article className={styles.pagination}>
      <ul className={styles.pagination_ul}>
        <div
          id={styles.prev_btn}
          className={styles.pagination_btn}
          onClick={prevFun}
        >
          Prev
        </div>
        {render?.map((el) => {
          return (
            <li
              style={
                newCurrentPage === el
                  ? { background: "gray" }
                  : { background: "transparent" }
              }
              onClick={() => {
                dispatch(setInquiryPage(el));
              }}
              key={Math.random() * 10000 * el}
              className={styles.pagination_li}
            >
              {el}
            </li>
          );
        })}
        <div
          id={styles.next_btn}
          className={styles.pagination_btn}
          onClick={nextFun}
        >
          Next
        </div>
      </ul>
    </article>
  );
};

export default InquiryPagination;
