import {useEffect, useState} from "react";
import styles from "../auth.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "react-redux";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/userSlice';
import {EMAIL_REGEX} from "../../utils/input-regex";
import {forgotPwdFulfilled} from "../../utils/action-types";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(forgotPassword({email}))
            .then((action) => {
                if (action.type === forgotPwdFulfilled) {
                    localStorage.setItem('visitedForgotPassword', 'true');
                    navigate('/reset-password');
                    setEmail('');
                }
            });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

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
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={validEmail ? "false" : "true"}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validEmail}
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