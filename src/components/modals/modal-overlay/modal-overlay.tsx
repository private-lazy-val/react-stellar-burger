import React from "react";
import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
    onClose: () => void;
}
const ModalOverlay = ({onClose}: ModalOverlayProps): React.JSX.Element => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    );
};

export default ModalOverlay;