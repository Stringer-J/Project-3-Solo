import { useContext, useState } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import './Profile.css';
import noImage from '../../assets/no-image-found.webp';
import SearchModal from '../Search/SearchModal';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plantDetails, setPlantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
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

    return (
        <>
            <div className="profileBody">
            {user ? (
                
                <div className='userDiv'>
                    <div className='profileBox'>
                        <h1>Username: {user.username}</h1>
                        <h1>Email: {user.email}</h1><hr />
                        <h3>Maybe one day profile info will be here, but not today, but hey at least orange is a nice color</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className='plantBox'>
                        <div className='plantTitle'>
                            <h1>Plants</h1>
                            <Link to="/search">
            <button>Search</button>
          </Link>
                        </div>
                        <div className='plantList'>
                        <p><br /> {user.plant.length > 0 ? (
                        user.plant.map((plant) => (
                            <div key={plant._id} className='plantItem'>
                            <button onClick={() => fetchPlantDetails(plant.commonName)}>
                            <div>
                            {plant.thumbNail ? (
                            <img src={plant.thumbNail} alt='No image' />
                        ) : <img id='noImage' src={noImage} alt='No Image' />}
                                <span>{plant.commonName}<br></br></span>
                            </div>
                            </button>
                            <br />
                            </div>
                        ))                       
                    ) : (
                        <span>No plants added</span>
                    )}</p>
                        </div>

                    </div>
                </div>
            ) : (
                <p>No user data available</p>
            )}
            
            </div>
            



            <SearchModal isOpen={isModalOpen} onClose={closeModal} commonName={plantDetails?.common_name || 'N/A'}>
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
                        </div>
                    </div>   
                )}
            </SearchModal>
        </>
    )
}

export default Profile;