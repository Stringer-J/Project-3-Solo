import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_USER } from '../../utils/queries';
import { AuthContext } from '../../utils/AuthContext.jsx';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { data, loading, error } = useQuery(GET_SINGLE_USER, {
        variables: { email: formData.email },
        skip: !formData.email
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((oldData) => {
            const updatedData = {
                ...oldData,
                [name]: value
            };
            // console.log('Updated State:', updatedData);
            return updatedData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Form Data:', formData);
        try {
            if (data && data.getUser) {
                console.log('User found:', data.getUser);
                login(data.getUser);
                navigate('/profile', { state: { userData: data.getUser }});
            } else {
                console.log('Email not found');
            }
        } catch (error) {
            console.error('Error finding user:', error);
        }
    };

    return (
        <div className='loginBody'>
            <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required placeholder='Enter your Email'
            /><br /><br />

            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required placeholder='Enter your Password'
            /><br /><br />

            <button type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Login'}
            </button>
        </form>
        </div>
    )
}

export default Login;