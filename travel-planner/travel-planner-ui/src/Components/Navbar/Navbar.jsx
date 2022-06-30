import "./Navbar.css"

export default function Navbar() {
    return (
        <div className="navbar">
            <a href={"/plan"} className="nav-item">Plan</a>
            <a className="nav-item">History</a>
            <a className="nav-item">Overview</a>
        </div>
    )
}
