import React from 'react';
import styles from './Description.module.css'

const Description = () => {
    return (
        <article className='Description'>
            <h1 className={styles.title}>Description</h1>
            <img
                className={styles.img}
                src={process.env.PUBLIC_URL + "/fakeDetail.png"}
                alt="detailImg"></img>

        </article>
    );
};

export default Description;