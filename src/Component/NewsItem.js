import defaultimage from "../news.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const NewsItem = ({ id, title, description, src, url }) => {
    const navigate = useNavigate();
    // This is the function that should handle deletion
    const handleDelete = () => {
        fetch(`http://localhost:5000/news/${id}`, { method: 'DELETE' })
            .then((res) => {
                if (res.ok) {
                    alert("News item deleted successfully");
                    navigate('/news'); // Navigate to the news list or homepage
                } else {
                    alert("Failed to delete the news item");
                }
            })
            .catch((error) => {
                console.error("Error deleting news item", error);
                alert("An error occurred while deleting the news item.");
            });
    };

    return (

        <div className="card bg-light text-dark mb-3 d-inline-block mx-3 my-3 px-2 py-2" style={{ maxWidth: "345px" }}>
            <img 
                src={src || defaultimage} 
                style={{ height: "200px", width: "330px" }} 
                className="card-img-top" 
                alt={title} 
            />
            <div className="card-body">
                <h5 className="card-title">{title.slice(0, 50)}</h5>
                <p className="card-text">
                    {description ? description.slice(0, 90) : "News is about to load, please wait or reload the page."}
                </p>
                <a href={url} className="btn btn-primary">Read More</a>
                <button className="btn btn-warning m-3" onClick={() => navigate('/UpdateNews/' + id)}>Update</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default NewsItem;
