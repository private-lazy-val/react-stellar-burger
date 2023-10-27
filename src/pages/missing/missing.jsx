import {useNavigate} from "react-router-dom";
import styles from './missing.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const Missing = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <>
            <h2 className={`text text_type_main-medium`}>Что-то пошло не так :(</h2>
            <Button htmlType="button" type="secondary" size="medium" onClick={goBack}>
                Вернуться на главную
            </Button>
        </>
    );
};

export default Missing;