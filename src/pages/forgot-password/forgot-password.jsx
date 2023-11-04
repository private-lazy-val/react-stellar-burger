import {useEffect} from "react";
import styles from "../auth.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "react-redux";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {EMAIL_REGEX} from "../../utils/input-regex";
import {forgotPwdFulfilled} from "../../utils/action-types";
import {useForm} from "../../hooks/use-form";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        email: (value) => EMAIL_REGEX.test(value)
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm({email: ''}, formValidators);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(forgotPassword({email: values.email}))
                .then((action) => {
                    if (action.type === forgotPwdFulfilled) {
                        localStorage.setItem('visitedForgotPassword', 'true');
                        navigate('/reset-password');
                        resetForm();
                    }
                });
        }
    }

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Укажите e-mail"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!validities.email}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validities.email}
                >
                    Восстановить
                </Button>
            </form>

            <p className={`${styles.action} text text_type_main-default text_color_inactive`}>
                Вспомнили пароль?
                <span className="line">
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </span>
            </p>
        </main>
    );
};

export default ForgotPassword;