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
                    <p>Plants: {user.plants.length > 0 ? (
                        user.plants.map((plant) => (
                            <span key={plant._id}>{plant.name}<br></br></span>
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