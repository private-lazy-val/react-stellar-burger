import {Link} from "react-router-dom";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import styles from '../auth.module.css';
import {selectCurrentUser} from "../../services/auth/selector";
import {useDispatch, useSelector} from "react-redux";
import {logOut, setCredentials} from "../../services/auth/authSlice";
import {useRegisterMutation} from "../../services/auth/authApiSlice";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const Profile = () => {
    const dispatch = useDispatch();
    // const user = useSelector(selectCurrentUser);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [logout] = useRegisterMutation();

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    // const handleLogOut = async (e) => {
    //     const res = await logout({token: user.refreshToken}).unwrap();
    //     if(res.success) {
    //         dispatch(logOut({
    //             token: user.refreshToken
    //         }));
    //     }
    // };

    return (
        <main className={styles.profile}>
            <div aria-label='sidebar'>
                <ul className={styles.sidebar}>
                    <li><Link className="text text_type_main-medium" to='/profile'>Профиль</Link></li>
                    <li><Link className="text text_type_main-medium text_color_inactive" to='orders'>История заказов</Link></li>
                    <li><Link className="text text_type_main-medium text_color_inactive" to='/login' >Выход</Link></li>
                    {/*onClick={handleLogOut}*/}
                </ul>
            </div>
            <form className={styles["profile-form"]}>
                {/*<Input*/}
                {/*    type="text"*/}
                {/*    id="username"*/}
                {/*    name='username'*/}
                {/*    placeholder="Имя"*/}
                {/*    // value={user.name}*/}
                {/*    onChange={null}*/}
                {/*    disabled*/}
                {/*/>*/}
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isIcon={true}
                    aria-invalid={validEmail ? "false" : "true"}
                />

                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    icon="EditIcon"
                    aria-invalid={validPwd ? "false" : "true"}
                />
            </form>
        </main>
    );
};

export default Profile;