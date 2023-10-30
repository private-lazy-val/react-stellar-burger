import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from '../auth.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {register} from '../../services/user/action';
import {selectErrMsg} from "../../services/user/selector";
import {resetError} from '../../services/user/userSlice';


const NAME_REGEX = /^[\p{L}\s'-]{2,30}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Register = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';

    const errMsg = useSelector(selectErrMsg);

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, [dispatch])

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);


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
        dispatch(register({email, password: pwd, name}))
            .then((action) => {
                if (action.type === 'user/register/fulfilled') {
                    navigate(from, {replace: true});

                    setName('');
                    setEmail('');
                    setPwd('');
                }
            });
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            {errMsg && <p className="text text_type_main-default text_color_error mt-2">{errMsg}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Имя"
                    value={name}
                    onChange={handleNameChange}
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