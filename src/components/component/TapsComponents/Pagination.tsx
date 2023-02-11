import React from 'react';
import styles from './Pagination.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { pageMessenger } from '../../../slice/pageSlice';
import { useSelector } from 'react-redux';

const Pagination = () => {

    type updatePageType = { page: { value: number } }
    let updatePage = useSelector<updatePageType>((state) => { return state.page.value }) as number
    const [totalPage] = useState(Math.ceil(98 / 10))   // 총 페이지 번호 10
    const dispatch = useDispatch()

    // 현재 페이지가 속한 그룹 구하기
    const displayPage = 5
    let pageGroup = Math.ceil(updatePage / displayPage)

    // 첫 번째 페이지, 라스트 페이지
    let lastPage = pageGroup * displayPage
    let firstPage = lastPage - displayPage + 1

    // 페이지네이션 그리는 영역
    let renderPage = []
    if (lastPage > totalPage) {
        lastPage = totalPage
    }
    for (let i = firstPage; i <= lastPage; i++) {
        renderPage.push(i)
    }

    return (
        <article className='Pagination'>
            <div className={styles.container}>
                <p onClick={()=>{
                    if(updatePage<1) {return}
                     dispatch(pageMessenger(updatePage--))
                }}>Prev</p>
                <ul className={styles.ul}>
                    {renderPage.map((page) => {
                        return (
                            <li
                                onClick={() => {
                                    dispatch(pageMessenger(page))
                                }}
                                key={Math.random()}>{page}</li>
                        )
                    })}
                </ul>
                <p onClick={()=>{
                    if(updatePage >totalPage) {return dispatch(pageMessenger(updatePage = totalPage)) }
                     dispatch(pageMessenger(updatePage++))
                }}>Next</p>
            </div>

        </article>
    );
};

export default Pagination;