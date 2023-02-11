import React, { useState } from 'react';
import styles from '../carousel/ControlBtn.module.css'
import { useEffect, useCallback, useRef } from 'react'

interface ControlBtnType {
    setPageNum: Function
}

const ControlBtn = ({ setPageNum }: ControlBtnType) => {

    const [btn] = useState([0, 1, 2, 3])
    const [activePage, setActivePage] = useState(0);
    const [active] = useState('')
    const pageBtn = useRef<HTMLLIElement>(null)

    const activeFun = useCallback(() => {
        for (let i = 0; i < btn.length; i++) {
            if (pageBtn.current !== null)

                document.querySelectorAll('.btn')[i].classList.remove('active')
        }
        document.querySelectorAll('.btn')[activePage].classList.add('active')

    }, [btn.length, activePage])

    useEffect(() => {
        activeFun()
    }, [activeFun])


    return (
        <ul className={styles.ControlBtn}>
            {btn.map((pageNum, i) => {
                return (
                    <li
                        ref={pageBtn}
                        key={Math.random() * 10000}
                        onClick={() => {
                            setPageNum(pageNum)
                            setActivePage(pageNum)

                        }}
                        className={`btn ${active}`}
                    ></li>
                )
            })}
        </ul>
    );
};

export default ControlBtn;