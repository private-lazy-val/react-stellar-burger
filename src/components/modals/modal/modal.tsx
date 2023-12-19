import React, {useEffect, forwardRef, ReactNode} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

type ModalProps = {
    children: ReactNode;
    closeModal: () => void;
}

type Ref = HTMLDivElement;

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal = forwardRef<Ref, ModalProps>(({children, closeModal}, ref): React.JSX.Element => {

    useEffect(() => {
        const handleEscClose = (e: KeyboardEvent): void => {
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

export default Modal;