import React from "react";
import styles from "./Pagination.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pageMessenger } from "../../../slice/pageSlice";
import { useSelector } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();

  // 유저가 클릭한 페이지 번호를 해당 번호를 저장한 스토어에서 가져온다.
  type updatePageType = { page: { value: number } };
  let updatePage = useSelector<updatePageType>((state) => {
    return state.page.value;
  }) as number;

  //페이지네이션에서 확인할 수 있는 페이지의 총 갯수
  const [totalPage] = useState(Math.ceil(37 / 10)); // 총 페이지 번호 10

  // 현재 페이지가 속한 그룹 구하기
  const displayPage = 5; //-> 보여줄 페이지 수
  let pageGroup = Math.ceil(updatePage / displayPage);

  // 첫 번째 페이지, 라스트 페이지(이를 이용해서 페이지네이션의 처음~ 끝 페이지를 그린다.)
  let lastPage = pageGroup * displayPage;
  let firstPage = lastPage - displayPage + 1;

  /** 페이지네이션을
   *  실질적으로
   *  그리는 영역 */
  // 그려넣을 최종 페이지 리스트를 renderPage 배열 변수에 저장한다.
  let renderPage = [];

  // 마지막 페이지가 전체 페이지 보다 커지면 마지막페이지와 총 페이지 번호가 같도록 한다.
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }
  //첫 번째 페이지부터 마지막 페이지까지 순회하며 해당 페이지들을 renderPage에 저장
  for (let i = firstPage; i <= lastPage; i++) {
    renderPage.push(i);
  }

  return (
    <article className="Pagination">
      <div className={styles.container}>
        {/* 이전 페이지로 이동하는 버튼 */}
        <p
          onClick={() => {
            if (updatePage <= 1) {
              return;
            }
            updatePage--;
            dispatch(pageMessenger(updatePage));
            console.log(updatePage);
          }}
        >
          Prev
        </p>
        {/* 페이지 번호가 그려지는 영역 */}
        <ul className={styles.ul}>
          {renderPage.map((page, i) => {
            return (
              // Pagination 컴포넌트 및 Reviews 컴포넌트에서 해당 번호를 재사용한다.
              <li
                style={
                  //자동으로 렌더링 되는 페이지 번호와
                  //유저가 선택한 페이지 번호가 같다면 각기 다른 배경을 적용
                  page === updatePage
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "none" }
                }
                className="page_li"
                onClick={() => {
                  // 유저가 클릭한 해당 페이지의 번호를 스토어에 저장
                  dispatch(pageMessenger(page));
                  updatePage = i + 1; //페이지네이션 Prev, Next 버튼과 공유 된다.
                }}
                key={Math.random() * 10000}
              >
                {page}
              </li>
            );
          })}
        </ul>
        {/* 다음 페이지 이동 버튼 */}
        <p
          onClick={() => {
            // 유저가 클릭한 페이지 번호와 총 페이지가 같을 때 까지
            // updatePage가 1씩 증가하게 가능토록 설정
            if (updatePage >= totalPage) {
              return dispatch(pageMessenger((updatePage = totalPage)));
            }
            // 유저가 입력한 페이지 번호는
            // 현 컴포넌트 및 review 컴포넌트에서 재사용된다.
            updatePage++;
            dispatch(pageMessenger(updatePage));
            console.log(updatePage);
          }}
        >
          Next
        </p>
      </div>
    </article>
  );
};

export default Pagination;
