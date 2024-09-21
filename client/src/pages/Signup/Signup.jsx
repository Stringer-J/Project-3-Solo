import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER_MUTATION } from '../../utils/mutations';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addUser, { loading, error }] = useMutation(ADD_USER_MUTATION);
    const navigate = useNavigate();

    //tested state with a console log, turns out it updates with every single keystroke
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
        console.log('Signup Form Data:', formData);
        try {
            const { data } = await addUser({ variables: {...formData} });
            console.log('User created:', data.addUser);
            navigate('/login');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className='signupBody'>
            <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required placeholder='Enter your Username'
            /><br /><br />

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
                {loading ? 'Submitting...' : 'Sign Up'}
            </button>
        </form>
        </div>
    )
}

export default Signup;