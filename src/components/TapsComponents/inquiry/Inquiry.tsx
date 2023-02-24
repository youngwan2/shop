import React, { useState, useEffect } from "react";
import styles from "./Inquiry.module.css";
import UserQna from "./UserQna";
import Response from "./response/Response";
import InquiryPagination from "./pagination/InquiryPagination";
import { useSelector } from "react-redux";
import { UserReqType } from "../../Types/UserReqType";

const Inquiry = () => {
  type UserInfoType = {
    username: string;
    id: number;
    login: boolean;
  };

  type newCurrentPageType = {
    inquiryPage: {
      value: number;
    };
  };
  const [hide, setHide] = useState(false);
  const [userReq, setUserReq] = useState<UserReqType>();
  const [userInfo, setUserInfo] = useState<UserInfoType>(Object);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [action] = useState(styles.action) as any;

  const newCurrentPage = useSelector<newCurrentPageType>((state) => {
    return state.inquiryPage.value;
  }) as number;

  // 로그인이 안 된 상태에서 QnA 등록 버튼을 클릭하면 로그인하고 오라고 알린다.
  const loginCheck = () => {
    if (userInfo) if (userInfo.login === true) return setHide(true);

    return alert("Please log in and try");
  };

  // 세션 스토리지에서 로그인한 유저 정보를 가져온다
  // 이 정보를 활용해서 권한이 있는 유저만 QnA 에 작성토록 한다.
  useEffect(() => {
    const sessionUserInfo = sessionStorage.getItem("userInfo");
    if (sessionUserInfo) setUserInfo(JSON.parse(sessionUserInfo));
  }, []);

  // 리듀스에서 가져온 현재 페이지 정보에 따라 QnA 게시글 정보를 가져온다.
  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/youngwan2/shop/inquiry?_limit=5&_page=${newCurrentPage}`
    )
      .then((response) => {
        if (response.ok === true) return response.json();
      })
      .then((result) => setUserReq(result));
  }, [newCurrentPage]);

  return (
    <>
      {" "}
      <section className="Inquiry">
        <article id={styles.table_outer_container}>
          <button
            className={styles.registrationBtn}
            style={{ width: "150px", marginTop: "30px" }}
            onClick={loginCheck}
          >
            Registration
          </button>
          <table id={styles.inquiry_table}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>No</th>
                <th style={{ width: "400px" }}>title</th>
                <th style={{ width: "100px" }}>Author</th>
                <th style={{ width: "150px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {userReq &&
                userReq.map((req, i) => {
                  return (
                    <tr
                      id={action}
                      key={Math.random() * 10000 * i}
                      className={`${styles.table_row} ${action} `}
                      onClick={() => {
                        setOpen(!open);
                        setIndex(i);
                      }}
                    >
                      <td>{req.id}</td>
                      <td>
                        {req.title}
                        <Response
                          open={open}
                          setOpen={setOpen}
                          userReq={userReq}
                          index={index}
                        />
                      </td>

                      <td>{req.author}</td>
                      <td>{req.date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </article>
        {hide ? <UserQna onHide={setHide} userInfo={userInfo}></UserQna> : null}
      </section>
      <img
        className={styles.inquiry_background}
        src={process.env.PUBLIC_URL + "../inquiry/qna.png"}
        alt="inquiry_background"
      ></img>
      {/* 페이지네이션 */}
      <InquiryPagination />
    </>
  );
};

export default Inquiry;
