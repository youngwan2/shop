import React from 'react';
import axios from 'axios';
import styles from '../pages/Detail.module.css';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { itemsType } from '../components/component/Products';
import Taps from '../components/component/TapsComponents/Taps';


const Detail = () => {
    const { id } = useParams();
    const [items, setItems] = useState<itemsType>();
    const [action, setAction] = useState('');
    const detailItem = useCallback(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setItems(response.data))
    }, [id])

    useEffect(() => {
        detailItem()
    }, [detailItem])


    function addClass() {
        setAction(styles.action)
        if (action === styles.action) {
            setAction('')
        }
    }

    const postReq = () => {
        axios.post('https://fakestoreapi.com/carts', {
            method: "POST",
            body: JSON.stringify(
                {

                }
            )
        })
    }
    return (
        <>
            <div className='Detail'>
                {items !== undefined ?
                    <div className={styles.item_container}>
                        <img
                            onClick={addClass}
                            alt='detail_image'
                            src={`${items.image}`}
                            className={`${styles.image} ${action}`}></img>
                        <div className={styles.contents}>
                            <h2 className={styles.title}>{items.title}</h2>
                            <div className={styles.price}>
                                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                                {items.price}
                            </div>
                            <div className={styles.vote}>
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                {items.rating.rate}{'(' + items.rating.count + ' number of people)'}</div>
                            <div className={styles.description}>{items.description}</div>
                            <div>
                                <button className={styles.purchaseBtn}>Purchase</button>
                                <button
                                    onClick={() => {
                                        postReq()
                                    }}
                                    className={styles.putBtn}>Add</button>
                            </div>
                        </div>
                    </div> : <img
                                className={styles.loadingImage}
                                 src={process.env.PUBLIC_URL + '/spinner.gif'} alt="spinner"></img>}

            </div>
            <Taps />
        </>


    );
};

export default Detail;