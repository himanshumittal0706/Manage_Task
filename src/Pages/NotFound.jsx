import { Link } from "react-router-dom"


export const NotFound = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404</h1>
            <p>Page not found</p>

            <Link to={"/"} className="">
                Back to home page
            </Link>
        </div>
    )
}


