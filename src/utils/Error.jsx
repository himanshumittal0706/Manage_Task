export const Error = ({ message = "Something went wrong. Please try again." }) => {
    return (
        <section>
            <div className="error-container">
                <div className="error-card">
                    <h2>⚠️ Oops!</h2>
                    <p>{message}</p>
                </div>
            </div>
        </section>
    )
}



