import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import './Profile.css';
import noImage from '../../assets/no-image-found.webp';
import SearchModal from '../Search/SearchModal';
import { DELETE_USER_PLANT_MUTATION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Profile = () => {
    const { user, logout, updateUserPlants } = useContext(AuthContext);
    const [deletePlant] = useMutation(DELETE_USER_PLANT_MUTATION);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const fetchPlantDetails = async (commonName) => {
        console.log('Button was clicked');
        console.log(commonName);
        setLoading(true);
        setError(null);
        try {
            const firstResponse = await fetch(`https://perenual.com/api/species-list?key=sk-hjux66ef51ce55fd36940&q=${commonName}`);
            if (!firstResponse.ok) {
                throw new Error('Failed to search by common name');
            }
            const firstData = await firstResponse.json();
            console.log('FIRST DATA:', firstData);
            const speciesId = firstData.data[0]?.id;
            console.log('ID:', speciesId);

            if (speciesId) {
                const secondResponse = await fetch(`https://perenual.com/api/species/details/${speciesId}?key=sk-hjux66ef51ce55fd36940&q`);
                if (!secondResponse.ok) {
                    throw new Error('Failed to fetch plant details');
                }
                const detailedData = await secondResponse.json();
                console.log(detailedData);
                setPlantDetails(detailedData);
                setIsModalOpen(true);
                console.log(detailedData);
            } else {
                throw new Error('No species found');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPlantDetails(null);
    };

    const handleRemovePlant = async (plantId) => {
        console.log(user);
        console.log(plantId);
        console.log(typeof plantId);
        try {
            const { data } = await deletePlant({ variables: { email: user.email, plantId }});
            console.log(data);
            if (data.deletePlant.success) {
                const updatedPlants = user.plant.filter(plant => plant._id !== plantId);
                updateUserPlants(updatedPlants);
            } else {
                console.error(data.deletePlant.message);
            }
        } catch (error) {
            console.error('Error removing plant:', error);
        }
    };

    return (
        <>
            <div className="profileBody">
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Plants:<br /> {user.plant.length > 0 ? (
                        user.plant.map((plant) => (
                            <div key={plant._id}>
                            <button onClick={() => fetchPlantDetails(plant.commonName)}>
                            <div>
                            {plant.thumbNail ? (
                            <img src={plant.thumbNail} alt='No image' />
                        ) : <img id='noImage' src={noImage} alt='No Image' />}
                                <span>{plant.commonName}<br></br></span>
                            </div>
                            </button>
                            <button onClick={() => handleRemovePlant(plant._id)}>Delete</button>
                            <br />
                            </div>
                        ))                       
                    ) : (
                        <span>No plants added</span>
                    )}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
            <button onClick={handleLogout}>Logout</button>
            </div>

            <SearchModal isOpen={isModalOpen} onClose={closeModal} commonName={plantDetails?.common_name || 'N/A'}>
                {plantDetails && (
                    <div className='plantDetails'>
                        {plantDetails.default_image?.thumbnail ? (
                            <img src={plantDetails.default_image.thumbnail} alt={plantDetails.common_name} />
                        ) : <img id='noImage' src={noImage} alt='No Image' />}
                        <p>Common Name: {plantDetails.common_name || 'N/A'}</p><hr />
                        <p>Scientific Name: {plantDetails.scientific_name?.[0] || 'N/A'}</p><hr />
                        <p>Other Names: {plantDetails.other_name?.[0] || 'N/A'}</p><hr />
                        <p>Cycle: {plantDetails.cycle || 'N/A'}</p><hr />
                        <p>Watering: {plantDetails.watering || 'N/A'}</p><hr />
                        <p>Depth Water Requirement: {plantDetails.depth_water_requirement?.[0] || 'N/A'}</p><hr />
                        <p>Watering Period: {plantDetails.watering_period || 'N/A'}</p><hr />
                        <p>Watering General Benchmark:</p>
                            <p>Unit: {plantDetails.watering_general_benchmark?.unit || 'N/A'}</p>
                            <p>Value: {plantDetails.watering_general_benchmark?.value || 'N/A'}</p><hr />
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
                            )}<hr />
                        <p>Sunlight: {plantDetails.sunlight?.[0] || 'N/A'}</p><hr />
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
                            )}<hr />
                    </div>   
                )}
            </SearchModal>
        </>
    )
}

export default Profile;