import React from 'react'
import styles from './Electronics.module.css'
import { ProductByCategoryType } from '../components/component/Types/Products'
import { useNavigate } from 'react-router-dom'
type itemsType ={
        id: number,
        title: string,
        image: string,
        price: number,
        rating: {
            rate: number,
            count: number
        },
        description: string,
        category: string,
        map: Function
}

const Jewelry= ({ productByCategory }: ProductByCategoryType) => {

    const navigation = useNavigate();
    return (
        <section className='Products' id='Products'>
            <div className={styles.products_container}>
                <h1 className={styles.title}>Jewelry</h1>
                <div className={styles.items_box}>
                    {Array.isArray(productByCategory)?
                        productByCategory.map((items: itemsType) => {              
                            return (
                                <div
                                    onClick={()=>{
                                        navigation(`/detail/${items.id}`)
                                    }}
                                    key={items.id}
                                    className={styles.items}>
                                    <img
                                        className={styles.product_img}
                                        style={{ width: '70%', height: "20vw", maxWidth: "250px", maxHeight: "200px" }}
                                        src={items.image} alt="product_img"></img>
                                    <div className={styles.contents}>
                                        <h4>{items.title}</h4>
                                        <div>'$'{items.price.toFixed(2)} </div>
                                        <div>{items.rating.rate}{'(' + items.rating.count + '명)'}</div>
                                        <div>{items.category}</div>
                                    </div>
                                </div>

                            )
                        }) :  <img src={process.env.PUBLIC_URL +'spinner.gif'} alt="spinner"></img>}
                </div>

             </div>
        </section >


    )

}

export default Jewelry