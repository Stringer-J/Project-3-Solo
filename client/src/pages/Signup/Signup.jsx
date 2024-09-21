import { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordRe: ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup Form Data:', formData);
    };

    return (
        <div className='signupBody'>
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

            <label htmlFor='passwordRe'>Re-enter Password:</label>
            <input
                type='password'
                id='passwordRe'
                name='passwordRe'
                value={formData.passwordRe}
                onChange={handleChange}
                required placeholder='Re-enter your Password'
            /><br /><br />

            <button type='submit'>Sign Up</button>
        </form>
        </div>
    )
}

export default Signup;