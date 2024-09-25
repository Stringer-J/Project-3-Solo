import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className="profileBody">
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Plants: {user.plant.length > 0 ? (
                        user.plant.map((plant) => (
                            <div key={plant._id}>
                                <img src={plant.thumbNail} alt='No Image' />
                                <span>{plant.commonName}<br></br></span>
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
        </>
    )
}

export default Profile;