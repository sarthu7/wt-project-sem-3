import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";

const NewsBoard = () => {
    const { category } = useParams(); // Get category from the route
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const url = category 
            ? `http://localhost:5000/news/category/${category}` // Fetch news based on category
            : "http://localhost:5000/news"; // Fetch all news if no category

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data); // Debugging log to ensure the data structure
                setArticles(data); // Set the fetched articles
            })
            .catch(error => console.error('Error fetching news:', error)); // Catch any fetch errors
    }, [category]); // Update whenever category changes

    return (
        <div className='bg-dark'>
            <h2 className="text-center text-light">Latest <span className="badge bg-danger">News</span></h2>
            {Array.isArray(articles) && articles.length > 0 ? (
                articles.map((news) => (
                    <NewsItem 
                        key={news.id}  // Unique key prop
                        id={news.id}
                        title={news.name}
                        description={news.description}
                        src={news.urlToImage}
                        url={news.url}
                        
                    />
                ))
            ) : (
                <div className="text-light">No articles found.</div>
            )}
        </div>
    );
};

export default NewsBoard;
