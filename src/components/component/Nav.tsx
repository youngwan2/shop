import React from "react";
import styles from '../component/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faShoppingBag, faBars } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { send } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../API/useFetch";
import axios from 'axios';

const Nav = () => {

    const [action, setAction] = useState('')
    const [select, setSelect] = useState('')


    //로그아웃 클릭 시 실행하는 함수
    function logoutHandler() {
        navigate('/login');
        sessionStorage.clear()
    }


    // 레듀서 영역
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const loginState = sessionStorage.getItem('loginState')

    const open = () => {
        if (action === '') setAction(styles.action)
        else setAction('')
    }

    //GET API 영역
    const categories = useFetch('https://fakestoreapi.com/products/categories')
    const getProductByCategory = useCallback(async (select: string) => {
        if (select)
            await axios.get(`https://fakestoreapi.com/products/category/${select}`)
                .then(response => response.data && dispatch(send(response.data)))
                .catch(error => console.log(error))
    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            getProductByCategory(select);
        }, 100)

    }, [getProductByCategory, select])

    return (
        <>
            <div
                onClick={open}
                className={styles.category_bars}
            > <FontAwesomeIcon icon={faBars} />
            </div>

            <div className={"Nav"}>
                <article className={`${styles.inner_search_con} ${action}`}>
                    <label htmlFor="inner_search"></label>
                    <input
                        type={"text"}
                        className={styles.inner_search}
                        id="inner_search"
                        placeholder="Keyword Search"></input>
                </article>
                <ul className={`${styles.menu} ${action}`}>
                    {categories !== undefined ?
                        categories.map((cate) => {
                            return (
                                <li
                                    key={Math.random() * 1000}
                                    className={styles.menu_list}>
                                    <Link
                                        onClick={() => { setSelect(cate) }}
                                        className={styles.link}
                                        style={{ textDecoration: 'none' }}
                                        to={`/${cate}`}>{cate}
                                    </Link>
                                </li>
                            )
                        }) : <div>data load failed...</div>}
                </ul>
            </div>

            <article className={styles.outer_search_con}>
                <div>
                    <label
                        //  onClick={searchBoxOpen}
                        htmlFor="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                    <input
                        id={"search"}
                        placeholder="Keyword Search"
                        className={styles.outer_search}
                    ></input>
                </div>
            </article>
            <div className={styles.cartLoginCon}>
                <article>
                    <FontAwesomeIcon
                        className={styles.cart_icon}
                        icon={faShoppingBag}
                        onClick={() => {
                            navigate('/cart')
                        }}></FontAwesomeIcon>
                </article>
                {Boolean(loginState) === false ?
                    <article
                        className={styles.login}
                        onClick={() => {
                            navigate('/login')
                        }}>Login
                    </article>
                    : <article
                        className={styles.login}
                        onClick={logoutHandler}>Logout
                    </article>}

            </div>

        </>
    )
}

export default Nav