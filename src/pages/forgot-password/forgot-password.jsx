import {useEffect, useState} from "react";
import styles from "../auth.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import request, {BASE_URL} from '../../app/api/api';


const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request(BASE_URL + 'password-reset',
                JSON.stringify({email}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            if(response.success) {
                setEmail('');
                navigate('/reset-password');
            }
        } catch (err) {
        }
    }

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Укажите e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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