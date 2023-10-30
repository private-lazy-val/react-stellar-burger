import {NavLink, useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import styles from '../auth.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUser} from "../../services/user/action";
import {selectUser} from "../../services/user/selector";

const NAME_REGEX = /^[\p{L}\s'-]{2,30}$/u;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setActive = ({isActive}) => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';


    let user = useSelector(selectUser);

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
                }
            });
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
                    <li><NavLink to='orders' className={setActive}>История заказов</NavLink></li>
                    <li><NavLink to='/login' className={setActive} onClick={onLogout}>Выход</NavLink></li>
                </ul>
            </div>
            <form className={styles["profile-form"]} onSubmit={handleUpdate}>
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
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.submit}
                    disabled={!validName || !validPwd || !validEmail}
                >
                    Сохранить
                </Button>
            </form>
        </main>
    );
};

export default Profile;