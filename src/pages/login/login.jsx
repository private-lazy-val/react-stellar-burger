import styles from "../auth.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLoginMutation} from "../../services/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../services/auth/authSlice";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [login, {isLoading}] = useLoginMutation();

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({email, password: pwd}).unwrap();
            const { success, user, accessToken, refreshToken } = userData;
            if(success) {
                dispatch(setCredentials({
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }));
            }
            setEmail('')
            setPwd('')
            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrorMessage('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrorMessage('Missing Email or Password');
            } else if (err.originalStatus === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
        }
    }

    return isLoading ? <h1>Loading...</h1> : (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Вход</h1>

            {errorMessage && <p className="text text_type_main-default text_color_error">{errorMessage}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                />
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                />

                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validPwd || !validEmail}
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