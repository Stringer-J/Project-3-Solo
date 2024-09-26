import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_USER } from '../../utils/queries';
import { AuthContext } from '../../utils/AuthContext.jsx';
import './Login.css';

const Login = () => {
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: ''
    });

    const { data, loading, error } = useQuery(GET_SINGLE_USER, {
        variables: { email: formDataLogin.email },
        skip: !formDataLogin.email
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormDataLogin((oldData) => {
            const updatedData = {
                ...oldData,
                [name]: value
            };
            // console.log('Updated State:', updatedData);
            return updatedData;
        });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log('Login Form Data:', formDataLogin);
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
        <form onSubmit={handleSubmitLogin}>
            <label htmlFor='email'>Email:</label>
            <input
                type='text'
                id='email'
                name='email'
                value={formDataLogin.email}
                onChange={handleChangeLogin}
                required placeholder='Enter your Email'
            /><br /><br />

            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                name='password'
                value={formDataLogin.password}
                onChange={handleChangeLogin}
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