import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import commonStyles from '../auth.module.css';
import styles from './profile.module.css';
import {useDispatch, useSelector} from "../../services/store";
import {updateUser} from "../../services/user/action";
import {selectErrMsg, selectUser} from "../../services/user/selector";
import {EMAIL_REGEX, NAME_REGEX, PWD_REGEX} from "../../utils/input-regex";
import {useForm} from "../../hooks/use-form";
import React, {useState} from "react";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";
const Profile = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const errMsg = useSelector(selectErrMsg);

    const user = useSelector(selectUser) || {name: '', email: '', password: '******'};

    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [password, setPassword] = useState('******');

    const formValidators = {
        name: (value: string) => NAME_REGEX.test(value),
        email: (value: string) => EMAIL_REGEX.test(value),
        password: (value: string) => PWD_REGEX.test(value),
    };

    const {values, validators, handleChange, isFormValid, resetForm} =
        useForm<User>(
            {name: user.name || '', email: user.email || '', password: '******'}, formValidators);

    // decides when to show Save button after editing an input field
    const canSaveEditedInput = (values.name !== user.name && validators.name)
        || (values.email !== user.email && validators.email)
        || (values.password !== '00000' && validators.password);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(updateUser({name: values.name, email: values.email, password: values.password}))
                .unwrap()
                .then(() => {
                    setName(user?.name ?? '');
                    setEmail(user?.email ?? '');
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
                    value={values.name!}
                    onChange={handleChange}
                    icon="EditIcon"
                    extraClass={styles.input}
                    aria-invalid={!validators.name}
                />
                <EmailInput
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    value={values.email}
                    onChange={handleChange}
                    isIcon={true}
                    aria-invalid={!validators.email}
                />
                <PasswordInput
                    id="password"
                    name='password'
                    placeholder="Пароль"
                    value={values.password!}
                    onChange={handleChange}
                    icon="EditIcon"
                    aria-invalid={!validators.password}
                />
                {canSaveEditedInput ? (
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