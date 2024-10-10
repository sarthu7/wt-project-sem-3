import { useNavigate } from "react-router-dom";

const Navbar = ({ setCategory }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setCategory(category);
        navigate(`/news/category/${category}`);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate('/news')}>
                    <span className="badge bg-danger text-light fs-4">News365</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("technology")}>Technology</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("business")}>Business</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("health")}>Health</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("science")}>Science</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("sports")}>Sports</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleCategoryClick("entertainment")}>Entertainment</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => navigate('/AddNews')}>Add News</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
