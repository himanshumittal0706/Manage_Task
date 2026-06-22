import { useSelector } from "react-redux";


export const Error = () => {

    const { error } = useSelector((state) => state.receipeAPI);

    return (
        <section>
            <div className="error-container">
                <div className="error-card">
                    <h2>⚠️ Oops!</h2>
                    <p>{error}</p>
                </div>
            </div>
        </section>
    )
}



