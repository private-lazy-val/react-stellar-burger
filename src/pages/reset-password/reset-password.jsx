import styles from "../auth.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {resetPassword} from "../../services/user/action";
import {useDispatch, useSelector} from "react-redux";
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/userSlice';
import {PWD_REGEX, TOKEN_REGEX} from "../../utils/input-regex";
import {resetPwdFulfilled} from "../../utils/action-types";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [token, setToken] = useState('');
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setValidToken(TOKEN_REGEX.test(token));
    }, [token])

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPassword({password: pwd, token}))
            .then((action) => {
                if (action.type === resetPwdFulfilled) {
                    localStorage.removeItem('visitedForgotPassword');
                    navigate('/login');
                    setPwd('');
                    setToken('');
                }
            });
    }

    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Введите новый пароль"
                    value={pwd}
                    onChange={handlePwdChange}
                    aria-invalid={validPwd ? "false" : "true"}
                />

                <Input
                    type="text"
                    id="token"
                    name='token'
                    placeholder="Код из письма"
                    value={token}
                    onChange={handleTokenChange}
                    required
                    autoComplete="off"
                    aria-invalid={validToken ? "false" : "true"}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validPwd || !validToken}
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