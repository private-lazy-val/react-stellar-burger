import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../auth.module.css';


const Missing = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <main className={styles.main}>
            <h1 className={`${styles[`missing-header`]} text text_type_digits-medium`}>Whoops! This is not <br/> what you were looking for</h1>
            <Button htmlType="button" type="secondary" size="large" onClick={goBack}>
                Go Back
            </Button>
        </main>
    );
};

export default Missing;