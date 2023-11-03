import styles from "../auth.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from '../../services/user/action';
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/userSlice';
import {EMAIL_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {loginFulfilled} from "../../utils/action-types";

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])


    useEffect(() => {
        // This function will be called when the component is unmounted
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({email, password: pwd}))
            .then((action) => {
                if (action.type === loginFulfilled) {
                    setEmail('');
                    setPwd('');
                }
            });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Вход</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={validEmail ? "false" : "true"}
                />
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={pwd}
                    onChange={handlePwdChange}
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