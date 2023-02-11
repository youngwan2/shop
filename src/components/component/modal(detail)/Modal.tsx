import React, { ChangeEvent } from 'react';
import styles from './Modal.module.css';
import Layout from './Layout';
import { itemsType } from '../Products';
import { useState, useRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalType {
    onClose: Function
    items: itemsType
}
const Modal = ({ onClose, items }: ModalType) => {

    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const refCount = useRef() as RefObject<HTMLInputElement>;

    function totalCal(e: ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        setTotal(total => total = value * items.price);
    }


    return (
        <>
            <article className={styles.Modal}>
                <form
                    action='http://localhost:3001/cart'
                    method='post'
                    className={styles.modal_form}>
                    <h1 className={styles.modal_title}>OPTION</h1>

                    <div className={styles.modal_content_box}>
                        {items &&
                            <div style={{ display: "none" }}>
                                {/* 상품 식별번호 */}
                                <label htmlFor='product_id'></label>
                                <input type={"text"} value={`${items.id}`} name='product_id' id='product_id' readOnly></input>
                                {/* 상품명 */}
                                <label htmlFor='product_id'></label>
                                <input type={"text"} value={`${items.title}`} name='product_name' readOnly></input>
                                {/* 상품 이미지 */}
                                <label htmlFor='product_id'></label>
                                <input type={"text"} value={`${items.image}`} name='product_image' readOnly></input>

                            </div>}


                        <div className={styles.size}>
                            <label htmlFor='size'>Size</label>
                            <select className={styles.select} name={"size"}>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                            </select>
                        </div>

                        <label htmlFor='count'>Count</label>
                        <input
                            ref={refCount}
                            onChange={totalCal}
                            type={'number'}
                            min="1"
                            placeholder='Please select at least one.'
                            id='count'
                            name='count'></input>
                        <div>
                            <h3
                                style={{ paddingTop: "2rem" }}
                            >Total</h3>
                            {/* 총 가격 */}
                            <span>$</span>
                            <label htmlFor='total'></label>
                            <input
                                className={styles.total}
                                id="total"
                                name='total'
                                type={'number'} min="1"
                                readOnly
                                value={total}
                            ></input>
                        </div>
                    </div>

                    <p><span></span></p>
                    <div className={styles.btn_con}>
                        <button
                            type='submit' 
                            onClick={()=>{
                                navigate(`/detail/${items.id}`)
                            }}
                            className={styles.addBtn}>Add</button>
                    </div>
                    <button
                        onClick={() => {
                            onClose(false)
                        }}
                        type='button' className={styles.closeBtn}>X</button>
                </form>
            </article>
            <Layout onClose={onClose} />
        </>
    );
};

export default Modal;