import styles from './spinner.module.css';
import React from "react";

const Spinner = (): React.JSX.Element => {
    return (
        <div className={styles.spinner}></div>
    );
}
export default Spinner;