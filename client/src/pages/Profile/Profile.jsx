import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const location = useLocation();
    const { userData } = location.state || {};
    return (
        <>
            <div className="profileBody">
            <h1>Profile</h1>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
            </div>
        </>
    )
}

export default Profile;