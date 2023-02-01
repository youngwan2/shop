import React from 'react';
import styles from './Login.module.css'
import { useState} from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {

    const [userId, setUserId] = useState('')
    const [users, setUsers] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function userIdStore(e: ChangeEvent<HTMLInputElement>) {
        setUserId(e.target.value)
    }

    function loginBtn() {

        const userInfo = localStorage.getItem('userName')
        if (userInfo !== userId) { return alert(" username does not exist") }
        else {
            navigate('/');
            //Nav 컴포넌트의 로그인/아웃 영역에 사용
            sessionStorage.setItem('loginState','true') 
        } 
    }


    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <article className='Login'>
            <h1 className={styles.login_title}>Login</h1>
            <form
                onSubmit={onSubmit}
                className={styles.login_form}
                method='POST' action='/'>
                <div>
                    <label style={{ paddingRight: "5px" }} htmlFor='id'>I D</label>
                    <input
                        onChange={userIdStore}
                        className={styles.user_id}
                        id='id'
                        name='userLoginId'
                        type={"text"}
                        required></input>
                    <span style={{ top: "24px" }}></span>
                </div>
                <div>
                    <label htmlFor='pw'>PW</label>
                    <input
                        className={styles.user_pw}
                        id='pw'
                        name='userLoginPw'
                        type={"password"}
                        required></input>
                    <span style={{ top: "24px" }}></span>
                </div>
                <button
                    onClick={loginBtn}
                    className={styles.loginBtn}>Login</button>
                <p style={{ marginTop: "3rem" }}><a href='/sign_up'>Sign Up</a></p>
            </form>


        </article>
    );
};

export default Login;