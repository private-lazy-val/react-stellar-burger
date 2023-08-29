import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");
const Modal = ({header, children, closePopup}) => {

    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === "Escape") {
                closePopup();
            }
        }
        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [closePopup])

    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <h2 className="text text_type_main-large">{header}</h2>
                    <button type="button" className={styles['exit-button']} onClick={closePopup}><CloseIcon
                        type="primary"/></button>
                    {children}
                </div>
                <ModalOverlay onClose={closePopup}/>
            </>
        ),
        modalRoot
    );
};

export default Modal;