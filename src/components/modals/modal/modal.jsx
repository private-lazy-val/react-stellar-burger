import React, {useEffect, forwardRef} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = forwardRef(({title, children, closeModal}, ref) => {

    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [closeModal])

    return ReactDOM.createPortal(
        <div ref={ref}>
            <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
                <h2 className={`text text_type_main-large mt-3`}>{title}</h2>
                <button type="button" className={styles['exit-button']} onClick={closeModal}><CloseIcon
                    type="primary"/></button>
                {children}
            </div>
            <ModalOverlay onClose={closeModal}/>
        </div>, modalRoot
    );
});

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;