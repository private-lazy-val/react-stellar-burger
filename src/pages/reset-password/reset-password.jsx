import styles from "../auth.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import request, {BASE_URL} from "../../app/api/api";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const TOKEN_REGEX = /^\d{6}$/;

const ResetPassword = () => {
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request(BASE_URL + 'password-reset/reset',
                JSON.stringify({password: pwd, token}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            if (response.success) {
                setPwd('');
                setToken('');
                navigate('/login');
            }
        } catch (err) {
        }
    }

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Введите новый пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                />

                <Input
                    type="text"
                    id="token"
                    name='token'
                    placeholder="Код из письма"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
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