import {useState, useCallback} from 'react';

export const useForm = (initialValues, validators) => {
    const [values, setValues] = useState(initialValues);
    const [validities, setValidities] = useState({});

    // Update values and validities
    const handleChange = useCallback(
        (event) => {
            const {name, value} = event.target;
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
        validities,
        handleChange,
        isFormValid,
        resetForm,
    };
};
