import { useState } from 'react';
import './Search.css';

const Search = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPlants = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://perenual.com/api/species-list?key=sk-hjux66ef51ce55fd36940&q');
            if (!response.status) {
                throw new Error('Network response not ok');
            }
            const data = await response.json();
            setPlants(data.data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="searchBody">
            <h1>Search</h1>
            <button onClick={fetchPlants} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Plants'}
            </button>
            {error && <p>Error: {error}</p>}

            <div className='searchResults'>
                {plants.length > 0 && (
                    <ul>
                        {plants.map((plant) => (
                            <li key={plant.id}>
                                {plant.common_name || 'No search results'}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </>
    );
};

export default Search;