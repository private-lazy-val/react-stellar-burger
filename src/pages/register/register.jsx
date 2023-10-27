import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from '../auth.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";


const USER_REGEX = /^[\p{L}\s'-]{2,30}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const REGISTER_URL = '/register';

const Register = () => {
    const navigate = useNavigate();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [success, setSuccess] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({user, email, pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response?.data);
            // console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            setUser('');
            setEmail('');
            setPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? navigate('/login') : (
                <section className={styles.register}>
                    {/*screen reader will announce this error immediately when the focus is set on this p*/}
                    <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">{errMsg}</p>
                    <h1 className="text text_type_main-medium">Регистрация</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            id="username"
                            name='username'
                            placeholder="Имя"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            autoComplete="off"
                            // When aria-invalid is set to "true", screen readers will announce that the input is invalid
                            // when the user focuses on or navigates to that input
                            aria-invalid={validName ? "false" : "true"}
                        />

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
                            disabled={!validName || !validPwd || !validEmail}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>

                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                        <span className="line"><Link to="/login" className={styles.link}>Войти</Link></span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;