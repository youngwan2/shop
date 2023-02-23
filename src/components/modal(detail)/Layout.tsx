import React from 'react';
import styles from './Layout.module.css'

interface ModalType {
    onClose: Function
}
const Layout = ({ onClose }: ModalType) => {
    return (
        <div
            onClick={() => {
                onClose(false)
            }}
            className={styles.Layout}>

        </div>
    );
};

export default Layout;