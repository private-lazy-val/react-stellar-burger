import commonStyles from "../auth.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {resetPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "../../services/store";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {PWD_REGEX, TOKEN_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";

type ResetPasswordValues = {
    password: string;
    token: string;
}
const ResetPassword = (): React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        password: (value: string) => PWD_REGEX.test(value),
        token: (value: string) => TOKEN_REGEX.test(value)
    };

    const {values, validators, handleChange, isFormValid, resetForm} =
        useForm<ResetPasswordValues>({password: '', token: ''}, formValidators);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(resetPassword({password: values.password, token: values.token}))
                .unwrap()
                .then(() => {
                    localStorage.removeItem('visitedForgotPassword');
                    navigate('/login');
                    resetForm();
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <main className={commonStyles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={commonStyles.form} onSubmit={handleSubmit}>
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Введите новый пароль"
                    value={values.password}
                    onChange={handleChange}
                    aria-invalid={!validators.password}
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
                    aria-invalid={!validators.token}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={commonStyles[`submit-btn`]}
                    disabled={!validators.password || !validators.token}
                >
                    Сохранить
                </Button>
            </form>

            <p className={`${commonStyles.question} text text_type_main-default text_color_inactive`}>
                Вспомнили пароль?
                <Link to="/login" className={commonStyles.link}>
                    Войти
                </Link>
            </p>
        </main>
    );
};

export default ResetPassword;