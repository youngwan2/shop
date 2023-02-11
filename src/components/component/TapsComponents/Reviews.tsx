

import React from 'react';
import styles from './Reviews.module.css'
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Reviews = () => {
    type updatePageType = { page: { value: number } }
    let postPage = useSelector<updatePageType>((state) => { return state.page.value }) as number
    const [reviews, setReviews] = useState<any[]>([])
    const reviewFetch = (page:number) => {
        axios.get(`http://localhost:3001/reviews?_page=${page}&_limit=10`)
            .then(res => { return setReviews(res.data) })
    }

    useEffect(() => {
        reviewFetch(postPage)
    }, [postPage])

    return (
        <>
            <article className='Reviews'>
                <h1 className={styles.title}>Reviews</h1>
                {reviews !== undefined ?
                    reviews.map((_, i) => {
                        return (
                            <section key={Math.random()} className={styles.review_con}>
                                <img src={process.env.PUBLIC_URL + "/profile.png"} className={styles.image} alt="user_profile"></img>
                                <div className={styles.content_con}>
                                    <p>{reviews[i].username}</p>
                                    <p>{reviews[i].review}</p>
                                </div>
                            </section>
                        )
                    }) : null
                }
            </article>
            <Pagination />
        </>
    );
};

export default Reviews;