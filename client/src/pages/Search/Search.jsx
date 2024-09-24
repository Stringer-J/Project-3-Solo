import { useState } from 'react';
import './Search.css';

const Search = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);

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

    const fetchPlantDetails = async (commonName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://perenual.com/api/species-list?key=sk-hjux66ef51ce55fd36940&q=${encodeURIComponent(commonName)}`);
            if (!response.ok) {
                throw new Error()
            }
            const data = await response.json();
            setPlantDetails(data.data[0]);
            setSelectedPlant(commonName);
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
                                {plant.default_image?.thumbnail ? (
                                    <img src={plant.default_image.thumbnail} alt={plant.common_name} />
                                ) : (
                                    <p>No thumbnail available</p>
                                )}
                                <p>
                                    <button onClick={() => fetchPlantDetails(plant.common_name)}>
                                        {plant.common_name || 'No search results'}
                                    </button>
                                </p>
                                {selectedPlant === plant.common_name && plantDetails && (
                                    <div className='plantDetails'>
                                        <p>Cycle: {plantDetails.cycle}</p>
                                    </div>
                                )}
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