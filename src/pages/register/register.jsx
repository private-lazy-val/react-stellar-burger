import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from '../auth.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../../services/auth/authSlice";
import {useRegisterMutation} from "../../services/auth/authApiSlice";

const NAME_REGEX = /^[\p{L}\s'-]{2,30}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';

    const [errorMessage, setErrorMessage] = useState(null);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [register, {isLoading}] = useRegisterMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await register({email, password: pwd, name}).unwrap();
            const { success, user, accessToken, refreshToken } = userData;
            if(success) {
                dispatch(setCredentials({
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }));
            }
            setName('');
            setEmail('');
            setPwd('');
            navigate(from, {replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Username Taken');
            } else {
                setErrorMessage('Registration Failed');
            }
        }
    }

    return isLoading ? <h1>Loading...</h1> : (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Регистрация</h1>

            {errorMessage && <p className="text text_type_main-default text_color_error">{errorMessage}</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    disabled={!validName || !validPwd || !validEmail}
                >
                    Зарегистрироваться
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
                <span className="line"><Link to="/login" className={styles.link}>Войти</Link></span>
            </p>
        </main>
    )
}

export default Register;