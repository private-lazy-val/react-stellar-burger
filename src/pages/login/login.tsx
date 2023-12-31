import commonStyles from "../auth.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/store";
import {login} from '../../services/user/action';
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {EMAIL_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";

const Login = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const redirectToRegister = (): void => {
        // Redirect users back to the page they wanted to visit before the registration
        navigate('/register', { state: { from } });
    };

    useEffect(() => {
        // This function will be called when the component is unmounted
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        email: (value: string) => EMAIL_REGEX.test(value),
        password: (value: string) => PWD_REGEX.test(value)
    };

    const {values, validators, handleChange, isFormValid, resetForm} =
        useForm<Pick<User, 'email' | 'password'>>({email: '', password: ''}, formValidators);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(login({email: values.email, password: values.password}))
                .unwrap() // no need to check if (action.type === loginFulfilled) {
                .then(() => {
                    resetForm();
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <main className={commonStyles.main}>
            <h1 className="text text_type_main-medium">Вход</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={commonStyles.form} onSubmit={handleSubmit}>
                <EmailInput
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!validators.email}
                />
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={values.password!}
                    onChange={handleChange}
                    aria-invalid={!validators.password}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={commonStyles[`submit-btn`]}
                    disabled={!validators.email || !validators.password}
                >
                    Войти
                </Button>
            </form>

            <p className={`${commonStyles.question} text text_type_main-default text_color_inactive`}>
                Вы – новый пользователь?
                <button onClick={redirectToRegister} className={`${commonStyles.link} text_type_main-default`}>
                    Зарегистрироваться
                </button>
            </p>

            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль?
                <Link to="/forgot-password"
                      className={commonStyles.link}>
                    Восстановить пароль
                </Link>
            </p>
        </main>
    );
}

export default Login;