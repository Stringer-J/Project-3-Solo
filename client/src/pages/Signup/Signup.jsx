import './Signup.css';

const Signup = () => {
    return (
        <>
        <div className='signupBody'>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='userName'>User Name: </label>
                <input type='text' id='userName' name='userName' required placeholder='Enter your Username'></input><br></br>
                <label htmlFor='email'>Email: </label>
                <input type='text' id='email' name='email' required placeholder='Enter your Email'></input><br></br>
                <label htmlFor='password'>Enter your Password: </label>
                <input type='password' id='password' name='password' required placeholder='Enter your Password'></input><br></br>
                <button>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup;