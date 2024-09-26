import { useState, useContext, useEffect } from 'react';
import './Search.css';
import SearchModal from './SearchModal.jsx';
import { useMutation } from '@apollo/client';
import { ADD_USER_PLANT_MUTATION } from '../../utils/mutations.js';
import { AuthContext } from '../../utils/AuthContext.jsx';
import noImage from '../../assets/no-image-found.webp';
import { Link } from 'react-router-dom';

const Search = () => {
    const { user, updateUserPlants } = useContext(AuthContext);
    console.log(user);

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [selectedPlantId, setSelectedPlantId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [addPlant] = useMutation(ADD_USER_PLANT_MUTATION, {
        onError: (error) => {
            console.error('Error adding plant:', error);
        },
        onCompleted: (data) => {
            console.log('Plant added:', data);
        }
    });

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
            console.log(data.common_name);
            setIsModalOpen(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPlantDetails(null);
        setSuccessMessage('');
    };

    const handleAddPlant = async () => {
        if (plantDetails && user) {
            console.log(plantDetails);
            const commonName = plantDetails.common_name;
            const thumbNail = plantDetails.default_image?.thumbnail;
            console.log(thumbNail);
            try {
                const { data } = await addPlant({ variables: { email: user.email, commonName, thumbNail } });
                setSuccessMessage('Plant added successfully!');
                console.log('Mutation result:', data);

                const updatedPlants = data.addPlant.plant;
                updateUserPlants(updatedPlants);
            } catch (error) {
                console.error('Error calling addPlant:', error);
                setSuccessMessage('Plant previously added...');
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchPlants = async () => {
            if (searchTerm.trim() === '') {
                setPlants([]);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://perenual.com/api/species-list?key=sk-hjux66ef51ce55fd36940&q=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Response was not okay');
                }
                const data = await response.json();
                setPlants(data.data.slice(0, 30));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchPlants();
        }, 300);

        return () => clearTimeout(debounceFetch);
    }, [searchTerm]);

    return (
        <>
        <div className="searchBody">
            <div className='searchBarTop'>
                <h1>Search</h1>
                <input type='text' value={searchTerm} onChange={handleSearchChange} placeholder='Search for plants here!' />
                <Link to="/profile">
            <button>Profile</button>
          </Link>
                {error && <p>Error: {error}</p>}
            </div>


            <div className='searchResults'>
                {plants.length > 0 && (
                    <ul>
                        {plants.map((plant) => (
                            <li key={plant.id}>
                                <div className='singleItem'>
                                <p>
                                <button className='plantLink' onClick={() => fetchPlantDetails(plant.id)}>
                                {plant.default_image?.thumbnail ? (
                                    <img src={plant.default_image.thumbnail} alt={plant.common_name} />
                                ) : (
                                    <img id='noImage' src={noImage} alt={plant.common_name} />
                                )}
                                
                                    
                                        {plant.common_name || 'No search results'}
                                    </button>
                                </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <SearchModal isOpen={isModalOpen} onClose={closeModal} addPlant={handleAddPlant} commonName={plantDetails?.common_name || 'N/A'}>
                
                {plantDetails && (
                    <div className='plantDetails'>
                        <div className='imageTitle'>
                            <div className='plantPic'>
                                {plantDetails.default_image?.thumbnail ? (
                                    <img src={plantDetails.default_image.thumbnail} alt={plantDetails.common_name} />
                                ) : <img id='noImage' src={noImage} alt='No Image' />}
                            </div>
                            <div className='titleNames'>
                                <h1>{plantDetails.common_name || 'N/A'}</h1><hr />
                                <h3>{plantDetails.scientific_name?.[0] || 'N/A'}</h3>
                            </div>
                        </div>
                        <div className='infoBody'>
                        <p>Other Names: {plantDetails.other_name?.[0] || 'N/A'}</p><hr />
                        <p>Cycle: {plantDetails.cycle || 'N/A'}</p><hr />
                        <p>Watering: {plantDetails.watering || 'N/A'}</p><hr />
                        <p>Depth Water Requirement: {plantDetails.depth_water_requirement?.[0] || 'N/A'}</p><hr />
                        <p>Watering Period: {plantDetails.watering_period || 'N/A'}</p><hr />
                        <p>Watering General Benchmark:</p>
                            <p>Unit: {plantDetails.watering_general_benchmark?.unit || 'N/A'}</p>
                            <p>Value: {plantDetails.watering_general_benchmark?.value || 'N/A'}</p><hr />
                        <p>Sunlight: {plantDetails.sunlight?.[0] || 'N/A'}</p>
                        {successMessage && <h4>{successMessage}</h4>}
                        </div>
                        
                    </div>   
                )}
            </SearchModal>
        </div>
        </>
    );
};

export default Search;