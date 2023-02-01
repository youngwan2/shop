import React from 'react'
import styles from './Banner.module.css'


const Banner = () => {
    return (
        <section className='Banner'>
            <div className={styles.banner_con}>
                <h1>Light yet  <span>powerful</span>,<br /> kind yet <span>fashionable</span>, <br /> <span>current</span> style</h1>
                <div className={styles.banner_image}></div>
            </div>
        </section>
    )
}

export default Banner