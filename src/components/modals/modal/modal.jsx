import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");
const Modal = ({title, children, closePopup}) => {

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
        <>
            <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
                <h2 className={`text text_type_main-large mt-3`}>{title}</h2>
                <button type="button" className={styles['exit-button']} onClick={closePopup}><CloseIcon
                    type="primary"/></button>

                {children}
            </div>
            <ModalOverlay onClose={closePopup}/>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default Modal;