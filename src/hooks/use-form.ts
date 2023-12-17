import {useState, useCallback, ChangeEvent} from 'react';

type TUseForm<T> = {
    values: T;
    validities: { [K in keyof T]?: boolean };
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    setValues: (state: T) => void;
    isFormValid: () => boolean;
    resetForm: () => void;
}

type TFormValidators = {
    [key: string]: (value: string) => boolean;
};

export const useForm = <T>(initialValues: T, validators: TFormValidators): TUseForm<T> => {
    const [values, setValues] = useState<T>(initialValues);
    const [validities, setValidities] = useState({});

    // Update values and validities
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = evt.target;
            // If a validator function exists for this name,
            // it's called with the value of the input field to check if the value is valid.
            const isValid = validators[name] ? validators[name](value) : true;
            setValues((prevValues) => ({...prevValues, [name]: value}));
            setValidities((prevValidities) => ({...prevValidities, [name]: isValid}));
        },
        [validators]
    );

    // Check the entire form validity
    const isFormValid = useCallback(
        () => Object.values(validities).every(Boolean),
        [validities]
    );

    // Reset the form to initial values and validities
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setValidities({});
    }, [initialValues]);

    return {
        values,
        setValues,
        validities,
        handleChange,
        isFormValid,
        resetForm,
    };
};
