import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import React from "react";
const ErrorComponent = (): React.JSX.Element => {
    const navigate = useNavigate();
    const goBack = (): void => navigate(-1);
    return (
        <>
            <h1 className="text text_type_digits-medium">An error occurred</h1>
            <p className="text text_type_digits-medium">Please try again later</p>
            <Button htmlType="button" type="secondary" size="large" onClick={goBack}>
                Go Back
            </Button>
        </>
    );
};

export default ErrorComponent;
