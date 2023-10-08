import CircularProgress from "@mui/joy/CircularProgress";
import Typography from '@mui/joy/Typography';
import { useCountUp } from 'use-count-up';

const LoadingComponent = ({isLoading}) => {
    const { value } = useCountUp({
        isCounting: isLoading,
        duration: 1,
        start: 0,
        end: 100,
        // If you want to perform an action after loading, add here
        // Otherwise, you might want to control isCounting externally
        onComplete: () => {}
    });

    return (
        <CircularProgress size="lg" color="neutral" variant="plain" determinate value={Number(value)}>
            <Typography>{value}%</Typography>
        </CircularProgress>
    );
};

export default LoadingComponent;
