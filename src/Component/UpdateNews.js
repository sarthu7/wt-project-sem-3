import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateNews() {
    const params = useParams(); 
    const navigate = useNavigate();
    const url = 'http://localhost:5000/news';

    // State to hold the news article data
    const [data, setData] = useState({
        name: '',
        description: '',
        urlToImage: '',
        url: '',
        category: ''
    });
    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(""); 

    
    useEffect(() => {
        const tempUrl = `${url}/id/${params._id}`;
        console.log("Fetching from:", tempUrl);
        fetch(tempUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(res => {
                console.log(res);
                setData(res);
            })
            .catch(err => {
                setError("Error fetching data: " + err.message);
                console.error("Error fetching data:", err);
            });
    }, [params._id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target; 
            setData(prevState => ({
            ...prevState,  
            [name]: value  
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); 

        fetch(`${url}/${params._id}`, {
            method: 'PATCH',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)  // Send updated data
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(updatedData => {
            console.log("News updated:", updatedData);
            setSuccessMessage("News updated successfully!"); 
            setTimeout(() => {
                navigate('/news');  
            }, 1500); 
        })
        .catch(err => {
            setError("Error updating data: " + err.message);
            console.error("Error updating data:", err);
        });
    };

    return (
        <div className="container">
            <h2>Update News Article</h2>
            {error && <div className="alert alert-danger">{error}</div>} 
            {successMessage && <div className="alert alert-success">{successMessage}</div>} 
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}  // Call handleChange on every input change
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}  // Call handleChange on every input change
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="urlToImage" className="form-label">Image URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="urlToImage"
                        name="urlToImage"
                        value={data.urlToImage}
                        onChange={handleChange}  
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">Article URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="url"
                        name="url"
                        value={data.url}
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={handleChange}  
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update News</button>
            </form>
        </div>
    );
}

export default UpdateNews;

