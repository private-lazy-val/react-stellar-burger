import {useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from '../auth.module.css';

const Missing = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <main className={styles.main}>
            <h2 className={`text text_type_main-medium`}>Well, that's disappointing!</h2>
            <Button htmlType="button" type="secondary" size="large" onClick={goBack}>
                Go back
            </Button>
        </main>
    );
};

export default Missing;