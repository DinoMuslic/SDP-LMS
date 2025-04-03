import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

const NoPage = () => {
    return(
        <>
        <div>404 Page Not Found</div>
        <Link to="/">
        <Button variant="outline-success">Home</Button>
        </Link>
        </>
    );
};

export default NoPage;