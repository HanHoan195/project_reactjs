
const Spinner = () => {
    return (
        <div className="spinner">
            <>
                <button className="btn btn-primarry" type="button" disabled="">
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </button>
            </>
        </div>
    )
}
export default Spinner;