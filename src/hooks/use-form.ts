import {useState, useCallback, ChangeEvent} from 'react';

type TUseForm<T> = {
    values: T;
    validators: { [K in keyof T]?: boolean };
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    setValues: (state: T) => void;
    isFormValid: () => boolean;
    resetForm: () => void;
}

type FormValidators = {
    [key: string]: (value: string) => boolean;
};

export const useForm = <T>(initialValues: T, formValidators: FormValidators): TUseForm<T> => {
    const [values, setValues] = useState<T>(initialValues);
    const [validators, setValidators] = useState({});

    // Update values and validators
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = evt.target;
            // If a validator function exists for this name,
            // it's called with the value of the input field to check if the value is valid.
            const isValid = formValidators[name] ? formValidators[name](value) : true;
            setValues((prevValues) => ({...prevValues, [name]: value}));
            setValidators((prevValidators) => ({...prevValidators, [name]: isValid}));
        },
        [formValidators]
    );

    // Check the entire form validity
    const isFormValid = useCallback(
        () => Object.values(validators).every(Boolean),
        [validators]
    );

    // Reset the form to initial values and validators
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setValidators({});
    }, [initialValues]);

    return {
        values,
        setValues,
        validators,
        handleChange,
        isFormValid,
        resetForm,
    };
};
