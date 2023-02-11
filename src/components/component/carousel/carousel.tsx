import React, { useState } from 'react';
import styles from '../carousel/carousel.module.css'
import ControlBtn from './ControlBtn';

const Carousel = () => {

    let [pageNum, setPageNum] = useState(0)




    return (
        <>
            <article
                style={{ transform: `translate(${-100 * pageNum}vw)` }}
                className={styles.Carousel}>
                {[0, 1, 2, 3].map((image) => {
                    return (
                        <div
                            key={Math.random() * 10000}
                            className={styles.item_con}>
                            <img
                                className={styles.item}
                                src={process.env.PUBLIC_URL + `./banner_image/carousel${image}.jpg`}
                                alt="banner_image"></img>
                        </div>
                    )
                })}
            </article>
            <ControlBtn setPageNum={setPageNum} /></>
    );
};

export default Carousel;