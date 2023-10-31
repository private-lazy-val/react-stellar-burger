import {NavLink, useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import styles from '../auth.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUser} from "../../services/user/action";
import {selectErrMsg, selectUser} from "../../services/user/selector";
import {EMAIL_REGEX, NAME_REGEX, PWD_REGEX} from "../../utils/input-regex";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setActive = ({isActive}) => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';


    const user = useSelector(selectUser);
    const errMsg = useSelector(selectErrMsg);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('00000000');
    const [validPwd, setValidPwd] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])


    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePwdChange = (e) => {
        setPwd(e.target.value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateUser({name, email, password: pwd}))
            .then((action) => {
                if (action.type === 'user/updateUser/fulfilled') {
                    setName(user.name);
                    setEmail(user.email);
                    setPwd('00000000');
                }
            });
    }

    const resetFields = () => {
        setName(user.name);
        setEmail(user.email);
        setPwd('00000000');
    }

    const onLogout = () => {
        dispatch(logout())
            .then((action) => {
                if (action.type === 'user/logout/fulfilled') {
                    navigate('/login');
                }
            });
    }

    return (
        <main className={styles.profile}>
            <div aria-label='sidebar'>
                <ul className={styles.sidebar}>
                    <li><NavLink to='/profile' className={setActive}>Профиль</NavLink></li>
                    <li><NavLink to='/profile/orders' className={setActive}>История заказов</NavLink></li>
                    <li><NavLink to='/login' className={setActive} onClick={onLogout}>Выход</NavLink></li>
                </ul>
            </div>
            <form className={styles["profile-form"]} onSubmit={handleUpdate}>
                {errMsg && <p className={`${styles.err} text text_type_main-default text_color_error mt-2`}>Oops! Something went wrong...</p>}
                <Input
                    type="text"
                    id="username"
                    name='username'
                    placeholder="Имя"
                    value={name}
                    onChange={handleNameChange}
                    icon="EditIcon"
                    extraClass={styles.input}
                />
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    isIcon={true}
                    aria-invalid={validEmail ? "false" : "true"}
                />
                <PasswordInput
                    type='password'
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={pwd}
                    onChange={handlePwdChange}
                    icon="EditIcon"
                    aria-invalid={validPwd ? "false" : "true"}
                />
                {validName && validPwd && validEmail &&
                    <div className={styles[`profile-btns`]}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                            extraClass={styles.submit}>
                            Сохранить
                        </Button>
                        <Button htmlType="button" type="secondary" size="large" onClick={resetFields}>
                            Отмена
                        </Button>
                    </div>
                }
            </form>
        </main>
    );
};

export default Profile;