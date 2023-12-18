import React, {useEffect} from "react";
import commonStyles from "../auth.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "../../services/store";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/user-slice';
import {EMAIL_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";

type ForgotPasswordFormValues = {
    email: string;
};

const ForgotPassword = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const formValidators = {
        email: (value: string) => EMAIL_REGEX.test(value)
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm<ForgotPasswordFormValues>({email: ''}, formValidators);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(forgotPassword(values.email))
                .unwrap()
                .then(() => {
                    localStorage.setItem('visitedForgotPassword', 'true');
                    navigate('/reset-password');
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
                <EmailInput
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
                    extraClass={commonStyles[`submit-btn`]}
                    disabled={!validities.email}
                >
                    Восстановить
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

export default ForgotPassword;