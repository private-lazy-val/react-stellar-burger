import styles from "../auth.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState, useContext} from "react";
import AuthContext from "../../context/auth-provider";
import axios from "axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const LOGIN_URL = '/login';
const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [success, setSuccess] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response?.data);
            // console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            const accessToken = response?.data?.accessToken;
            setAuth({email, pwd, accessToken});

            setSuccess(true);
            setEmail('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? navigate('/profile') : (
                <section className={styles.register}>
                    <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                    <h1 className="text text_type_main-medium">Вход</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <EmailInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                            aria-invalid={validEmail ? "false" : "true"}
                        />

                        <PasswordInput
                            type="password"
                            id="password"
                            name='password'
                            placeholder="Пароль"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            autoComplete="off"
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
                        <span className="line"><Link to="/register" className={styles.link}>Зарегистрироваться</Link></span>
                    </p>

                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                        <span className="line"><Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;