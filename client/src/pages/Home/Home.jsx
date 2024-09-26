import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_MUTATION } from '../../utils/mutations';
import { GET_SINGLE_USER } from '../../utils/queries';
import { AuthContext } from '../../utils/AuthContext';
import { client } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Home.css';
import plantPic1 from '../../assets/plantpic1.webp';
import plantPic2 from '../../assets/plantpic2.webp';
import plantPic3 from '../../assets/plantpic3.webp';

const Home = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addUser, { loading, error }] = useMutation(ADD_USER_MUTATION);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

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
            const { data: addUserData } = await addUser({ variables: {...formData} });
            console.log('User created:', addUserData.addUser);

            const { data: userData } = await client.query({
                query: GET_SINGLE_USER,
                variables: { email: formData.email },
            });

            login(userData.getUser);
            navigate('/profile');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: ''
    });

    const { data } = useQuery(GET_SINGLE_USER, {
        variables: { email: formDataLogin.email },
        skip: !formDataLogin.email
    });

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
        <>
        <div className='homeBody'>
            {/* Bootstrap Carousel */}
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={plantPic1} className="d-block w-100" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img src={plantPic2} className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img src={plantPic3} className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
            </div>
            <div className='homeContent'>
            <div className='aboutUsBox'>
                 <h1>What To Do</h1><hr />
                 <p>Sign up if you are new and login if you already have an account!</p><hr />
                 <p>From there, you'll be brought to your profile page. Click search and you'll be brought to a search page where you can see plant information and even add plants to your profile for quick reference!</p><hr />
                 <p>Maybe one day this will be more fleshed out, who knows?</p><br />
                 <h2>- Josh</h2>

            </div>
            <div className='plantFinderBox'>
                <div className='signupBox'>
                    <div id='signUpFormTitle'>
                    <h1>SIGN UP</h1>
                <form id='signUpForm' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required placeholder='Enter your Username'
            />

            <label htmlFor='email'>Email:</label>
            <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required placeholder='Enter your Email'
            />

            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required placeholder='Enter your Password'
            />

            <button id='signUpButton' type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Sign Up'}
            </button>
            </form>
                </div>
                </div>
                <div className='loginBox'>
                <div id='loginFormTitle'>
                <h1>LOGIN</h1>
                <form id='loginForm' onSubmit={handleSubmitLogin}>
            <label htmlFor='email'>Email:</label>
            <input
                type='text'
                id='email'
                name='email'
                value={formDataLogin.email}
                onChange={handleChangeLogin}
                required placeholder='Enter your Email'
            />

            <label htmlFor='password'>Password:</label>
            <input
                type='password'
                id='password'
                name='password'
                value={formDataLogin.password}
                onChange={handleChangeLogin}
                required placeholder='Enter your Password'
            />

            <button id='loginButton' type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Login'}
            </button>
        </form>
        </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Home;