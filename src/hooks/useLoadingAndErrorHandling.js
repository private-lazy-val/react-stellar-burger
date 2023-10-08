import {useSelector} from 'react-redux';
const useLoadingAndErrorHandling = (isLoadingSelector, hasErrorSelector) => {
    const isLoading = useSelector(isLoadingSelector);
    const hasError = useSelector(hasErrorSelector);

    return {
        isLoading,
        hasError
    };
};

export default useLoadingAndErrorHandling;

