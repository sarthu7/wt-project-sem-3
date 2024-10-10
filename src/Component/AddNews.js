import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        description: '',
        urlToImage: '',
        url: '',
        category: ''
    });
    const [successMessage, setSuccessMessage] = useState("")

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

                const newArticle = await response.json();
                console.log('New Article Added:', newArticle);
                setSuccessMessage("News updated successfully!");
                navigate('/news'); 
                console.error('Error adding news:', response.statusText);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add News Article</h2>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                <button type="submit" className="btn btn-primary  " onClick={()=>{
                    alert('Your News is Added Successfully')
                }}>Add News</button>
            </form>
        </div>
    );
};

export default AddNews;
