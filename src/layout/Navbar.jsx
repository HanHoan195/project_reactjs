import { NavLink, useSearchParams } from "react-router-dom";

const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to={"/"}>
                    MOVIES
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/home"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/dashboard"}>
                                Dashboard
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            value={searchParams.get("filter" || "")}
                            onChange={event => {
                                let filter = event.target.value;
                                if (filter) {
                                    setSearchParams({ filter })
                                } else {
                                    setSearchParams({})
                                }
                            }}
                        />
                        <button className="btn btn-outline-secondary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>

    )
}
export default Navbar;