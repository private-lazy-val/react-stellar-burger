import styles from "../auth.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from '../../services/user/action';
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {EMAIL_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {loginFulfilled} from "../../utils/user-action-types";
import {useForm} from "../../hooks/use-form";

const Login = () => {
    const dispatch = useDispatch();

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        // This function will be called when the component is unmounted
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        email: (value) => EMAIL_REGEX.test(value),
        password: (value) => PWD_REGEX.test(value)
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm({email: '', password: ''}, formValidators);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(login({email: values.email, password: values.password}))
                .then((action) => {
                    if (action.type === loginFulfilled) {
                        resetForm();
                    }
                });
        }
    }

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Вход</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!validities.email}
                />
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={values.password}
                    onChange={handleChange}
                    aria-invalid={!validities.password}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validities.email || !validities.password}
                >
                    Войти
                </Button>
            </form>

            <p className={`${styles.action} text text_type_main-default text_color_inactive`}>
                Вы – новый пользователь?
                <span className="line">
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </span>
            </p>

            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
                <span className="line">
                    <Link to="/forgot-password"
                          className={styles.link}>
                        Восстановить пароль
                    </Link>
                </span>
            </p>
        </main>
    );
}

export default Login;