import React from 'react';
import styles from './SignUp.module.css'
// import { FormEvent } from 'react'
import { MouseEvent } from 'react';
import { useState, useEffect } from 'react'
import { useFetch } from '../API/useFetch';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const userInfo = useFetch('http://localhost:3000/users')


    // 이메일 유효성
    function emailEffectiveness() {
        const target = email
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        const result = regExp.test(target)
        if (!result) {
            alert('Wrong Format..');

        } else { return alert('Complete!') }
    }



    const [users, setUsers] = useState<any[]>()

    useEffect(() => {
        setUsers(userInfo)
    }, [userInfo])


    // 사용자 아이디 유효성
    function usernameEffectiveness() {
        const result = /^[a-zA-Z0-9]{4,10}$/.test(userName)
        if (!users?.find((user) => { return user.username === userName })) {
            result ? alert('Complete!') : alert('Wrong Format..')
        } else {
            alert("Duplicate name. Please enter a different name.")
        }
    }

    // 전송 후 새로고침 방지
    function submit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
    }

    // 로컬 스토리지에 데이터 저장(아이디와 비밀번호만)
    function localDataStorage() {
        localStorage.setItem("userName", userName)
    }

    return (
        <section className='SignUp'>
            <h1 className={styles.title}>Sign Up</h1>
            <form
                // onSubmit={submit}
                action='http://localhost:3000/users' method='POST' className={styles.form}>

                {/* 이메일 */}
                <div className={styles.email}>
                    <label
                        htmlFor='e-mail'>e-mail</label>
                    <input
                        name='e_mail'
                        onChange={(e) => { setEmail(e.target.value) }}
                        type={"text"}
                        id="e_mail"
                        required
                        placeholder='ex) andtr33@xmail.com'></input>
                    <span></span>
                    <button
                        onSubmit={submit}
                        onClick={emailEffectiveness}
                        style={{ maxWidth: '100px' }}>Check</button>
                </div>

                {/* 유저 본명 */}
                <div className={styles.name}>
                    <div>
                        <label htmlFor='first_name'>first name</label>
                        <input
                            name='first_name'
                            pattern={'[a-zA-Z]{1,10}'}
                            type={"text"} id="first_name"
                            required></input>
                        <span></span>
                    </div>
                    <label htmlFor='last_name'>last name</label>
                    <input
                        name='last_name'
                        pattern={'[a-zA-Z]{1,10}'}
                        type={"text"}
                        id="last_name"
                        required></input>
                    <span></span>
                </div>

                {/* 유저 아이디/비밀번호 */}
                <div className={styles.username}>
                    <label htmlFor='username'>username</label>
                    <input
                        name='username'
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        type={"text"}
                        id="username"
                        pattern='^[A-Za-z0-9]{4,10}$'
                        placeholder='ex) god123 => 4 to 10 digits'
                        required></input>
                    <span></span>
                    <button
                        onSubmit={submit}
                        onClick={usernameEffectiveness}
                        style={{ maxWidth: '100px' }}>Check</button>
                </div>

                <div className={styles.password}>
                    <label htmlFor='password'>password</label>
                    <input
                        name='password'
                        type={"password"}
                        id="password"
                        pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$'
                        placeholder='ex) god!%12 => 8 ~ digits'
                        required></input>
                    <span></span>
                </div>

                {/* 유저 전화번호 및 인증확인 */}
                <div className={styles.phone}>
                    <div>
                        <label htmlFor='phone'>phone</label>
                        <input
                            name='phone'
                            pattern='^\d{3}-\d{3,4}-\d{4}$'
                            type={"tel"}
                            id="phone"
                            placeholder='ex) 010-1234-5678'
                            required></input>
                        <span></span>
                    </div>
                </div>

                {/* 전송버튼 */}
                <div style={{ marginTop: "2rem" }}>
                    <button
                        onClick={localDataStorage}
                        style={{
                            maxWidth: '200px',
                            background: "tomato"
                        }}
                        type='submit'>Submit</button>
                </div>
            </form>
        </section>
    );
};



export default SignUp;