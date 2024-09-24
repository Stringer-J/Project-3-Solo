import { useState } from 'react';
import './Search.css';

const Search = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [selectedPlantId, setSelectedPlantId] = useState(null);

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
            console.log(data.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlantDetails = async (plantId) => {
        console.log('Fetching details for Plant ID:', plantId);
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://perenual.com/api/species/details/${plantId}?key=sk-hjux66ef51ce55fd36940&q`);
            if (!response.ok) {
                throw new Error('Failed to get plant details');
            }
            const data = await response.json();
            setPlantDetails(data);
            setSelectedPlantId(plantId);
            console.log(data);
            console.log(plantId);
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
                                    <button onClick={() => fetchPlantDetails(plant.id)}>
                                        {plant.common_name || 'No search results'}
                                    </button>
                                </p>
                                {selectedPlantId === plant.id && plantDetails && (
                                    <div className='plantDetails'>
                                        <p>Common Name: {plantDetails.common_name || 'N/A'}</p>
                                        <p>Scientific Name: {plantDetails.scientific_name?.[0] || 'N/A'}</p>
                                        <p>Other Names: {plantDetails.other_name?.[0] || 'N/A'}</p>
                                        <p>Cycle: {plantDetails.cycle || 'N/A'}</p>
                                        <p>Watering: {plantDetails.watering || 'N/A'}</p>
                                        <p>Depth Water Requirement: {plantDetails.depth_water_requirement?.[0] || 'N/A'}</p>
                                        <p>Watering Period: {plantDetails.watering_period || 'N/A'}</p>
                                        <p>Watering General Benchmark:</p>
                                            <p>Unit: {plantDetails.watering_general_benchmark?.unit || 'N/A'}</p>
                                            <p>Value: {plantDetails.watering_general_benchmark?.value || 'N/A'}</p>
                                        <p>Plant Anatomy:</p>
                                        {plantDetails.plant_anatomy?.length > 0 ? (
                                            <ul>
                                                {plantDetails.plant_anatomy?.map((anatomy, index) => (
                                                    <li key={index}>
                                                        {anatomy.part}: {anatomy.color.join(', ') || 'N/A'}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>N/A</p>
                                        )}
                                        <p>Sunlight: {plantDetails.sunlight?.[0] || 'N/A'}</p>
                                        <p>Pruning Months: {plantDetails.pruning_month?.[0] || 'N/A'}</p> 
                                        {plantDetails.pruning_month && plantDetails.pruning_month.length > 0 ? (
                                            <ul>
                                                {plantDetails.pruning_month.map((month, index) => (
                                                    <li key={index}>
                                                        {month || 'N/A'}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>N/A</p>
                                        )}  
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