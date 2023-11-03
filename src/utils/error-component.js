import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";

const ErrorComponent = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <>
            <h1 className="text text_type_digits-medium mb-2" style={{'color': '#0CC'}}>An error occurred</h1>
            <p className="text text_type_digits-medium" style={{'color': '#0CC'}}>Please try again later</p>
            <Button htmlType="button" type="secondary" size="large" onClick={goBack}>
                Go Back
            </Button>
        </>
    );
};

export default ErrorComponent;
