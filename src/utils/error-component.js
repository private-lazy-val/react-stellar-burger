import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

const ErrorComponent = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <>
            <h2 className='text text_type_main-medium'>Well, that's disappointing!</h2>
            <Button htmlType="button" type="secondary" size="large" onClick={goBack}>
                Go Back
            </Button>
        </>
    );
};

export default ErrorComponent;
