import React from 'react'
import styles from './Banner.module.css'
import Carousel from './carousel/carousel'


const Banner = () => {
    return (
        <>
            <section className='Banner'>
                <Carousel></Carousel>
            </section>

        </>
    )
}

export default Banner