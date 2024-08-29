import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner = () => {
    return (
        <>
            <Spinner animation="border" size="sm" variant="danger" />
            <Spinner animation="border" variant='warning' />
            <Spinner animation="border" size="sm" variant='info' />
            {/* <Spinner animation="grow" /> */}

        </>
    )
};

export default LoadingSpinner;