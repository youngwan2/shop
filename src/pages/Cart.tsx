import React from 'react';
import styles from './Cart.module.css'

const Cart = () => {
    return (
        <div className='Cart'>
            <h1>Cart</h1>

            <table
                className={styles.table}
                width={'80%'}>
                <thead>
                    <tr
                        className={styles.tr}>
                        <th>ID</th>
                        <th>PRODUCT</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th>ETC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        className={styles.tr}>
                        <td>mes</td>
                        <td>3</td>
                        <td>5</td>
                        <td>1</td>
                        <td>
                            <button className={styles.payBtn}>Pay</button>
                            <button className={styles.cancelBtn}>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default Cart;