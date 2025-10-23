import { useRoutes } from "react-router-dom";
import { Router } from "../../routes/index.js";

function AllRoute() {
    const element = useRoutes(Router);
    return(
        <>
        {element}
        </>
    )
}

export default AllRoute;