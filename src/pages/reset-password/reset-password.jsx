import styles from "../auth.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {resetPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "react-redux";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {PWD_REGEX, TOKEN_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        password: (value) => PWD_REGEX.test(value),
        token: (value) => TOKEN_REGEX.test(value)
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm({password: '', token: ''}, formValidators);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(resetPassword({password: values.password, token: values.token}))
                .unwrap()
                .then(() => {
                        localStorage.removeItem('visitedForgotPassword');
                        navigate('/login');
                        resetForm();
                });
        }
    }

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Введите новый пароль"
                    value={values.password}
                    onChange={handleChange}
                    aria-invalid={!validities.password}
                />
                <Input
                    type="text"
                    id="token"
                    name='token'
                    placeholder="Код из письма"
                    value={values.token}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    aria-invalid={!validities.token}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validities.password || !validities.token}
                >
                    Сохранить
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

export default ResetPassword;