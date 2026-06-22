import { Spinner } from "react-bootstrap";


export const Loader = () => {

    return (
        <section>
            <div className="loader-overlay">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </section>
    )
}






