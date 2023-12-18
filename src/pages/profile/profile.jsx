import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from '../auth.module.css';
import styles from './profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../services/user/action";
import {selectErrMsg, selectUser} from "../../services/user/selector";
import {EMAIL_REGEX, NAME_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";
import {useState} from "react";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";

const Profile = () => {
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);

    const user = useSelector(selectUser) || { name: '', email: '' };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('******');

    const formValidators = {
        name: (value) => NAME_REGEX.test(value),
        email: (value) => EMAIL_REGEX.test(value),
        password: (value) => PWD_REGEX.test(value),
    };

    const {values, validities, handleChange, isFormValid, resetForm} =
        useForm(
            {name: user?.name || '', email: user?.email || '', password: '******'}, formValidators);


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            dispatch(updateUser({name: values.name, email: values.email, password: values.password}))
                .unwrap()
                .then(() => {
                    setName(user.name);
                    setEmail(user.email);
                    setPassword('******');
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <main className={styles.profile}>
            <ProfileSideMenu/>
            <form className={styles["profile-form"]} onSubmit={handleUpdate}>
                {errMsg &&
                    <p className={`${styles[`profile-error`]} text text_type_main-default text_color_error mt-2`}>Oops!
                        Something
                        went wrong...</p>}
                <Input
                    type="text"
                    id="name"
                    name='name'
                    placeholder="Имя"
                    value={values.name}
                    onChange={handleChange}
                    icon="EditIcon"
                    extraClass={styles.input}
                    aria-invalid={!validities.name}
                />
                <EmailInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    isIcon={true}
                    aria-invalid={!validities.email}
                />
                <PasswordInput
                    type='password'
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={values.password}
                    onChange={handleChange}
                    icon="EditIcon"
                    aria-invalid={!validities.password}
                />
                {(values.name !== user.name && validities.name)
                || (values.email !== user.email && validities.email)
                || (values.password !== '00000' && validities.password) ? (
                    <div>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                            extraClass={commonStyles[`submit-btn`]}>
                            Сохранить
                        </Button>
                        <Button htmlType="button" type="secondary" size="large" onClick={resetForm}>
                            Отмена
                        </Button>
                    </div>
                ) : null}
            </form>
        </main>
    );
};

export default Profile;