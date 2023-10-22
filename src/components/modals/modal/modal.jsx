import React, {useEffect, forwardRef} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = forwardRef(({children, closeModal}, ref) => {

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
            <div className={`${styles.modal}`}>
                <button type="button" className={styles['exit-button']} onClick={closeModal}><CloseIcon
                    type="primary"/></button>
                {children}
            </div>
            <ModalOverlay onClose={closeModal}/>
        </div>, modalRoot
    );
});

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;