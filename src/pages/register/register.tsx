import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import commonStyles from '../auth.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../services/store";
import {register} from '../../services/user/action';
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {EMAIL_REGEX, NAME_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
}
const Register = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        name: (value: string) => NAME_REGEX.test(value),
        email: (value: string) => EMAIL_REGEX.test(value),
        password: (value: string) => PWD_REGEX.test(value),
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm<RegisterFormValues>({name: '', email: '', password: ''}, formValidators);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(register({email: values.email, password: values.password, name: values.name}))
                .unwrap()
                .then(() => {
                    navigate(from, {replace: true});
                    resetForm();
                })
                .catch(err => console.error(err))
        }
    };

    return (
        <main className={commonStyles.main}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={commonStyles.form} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Имя"
                    value={values.name}
                    onChange={handleChange}
                    // When aria-invalid is set to "true", screen readers will announce that the input is invalid
                    // when the user focuses on or navigates to that input
                    aria-invalid={!validities.name}
                />
                <EmailInput
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
                    extraClass={commonStyles[`submit-btn`]}
                    disabled={!validities.name || !validities.email || !validities.password}
                >
                    Зарегистрироваться
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <Link to="/login" className={commonStyles.link}>Войти</Link>
            </p>
        </main>
    )
}

export default Register;