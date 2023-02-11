import React from 'react';
import styles from '../TapsComponents/Taps.module.css'
import Description from './Description';
import Reviews from './Reviews';
import Inquiry from './Inquiry';
import { useState } from 'react'


const Taps = () => {
  
    const [taps] = useState([<Description />, <Reviews/>, <Inquiry />])
    const [count, setCount] = useState(0)
    const [tapTitle] = useState(['Description', 'Reviews', 'Inquiry'])

    return (
        <article className='Taps'>
            <div className={styles.detail_taps}>
                {tapTitle.map((tapsTitle, i) => {
                    return (
                        <button
                            key={Math.random()}
                            style={{}}
                            onClick={() => {
                                setCount(i)
                            }}>{tapsTitle}</button>
                    )
                })}
            </div>
            <section>{taps[count]}</section>
        </article>
    );
};

export default Taps;