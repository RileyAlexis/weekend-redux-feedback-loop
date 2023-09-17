import{ useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Auth () {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const dispatch = useDispatch();

    const viewLogin = (status) => {
        setError(null);
        setIsLogin(status);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            setError('Make sure passwords match');
            return
        }
        if (!isLogin) {
        axios.post('/user/signup/', {email: email, password: password})
            .then((response) => {
                console.log('Signup response from Server', response.data);
                if (response.data.detail) {
                    setError(response.data.detail);
                } else {
                    setCookie('Email', response.data.email);
                    setCookie('AuthToken', response.data.token);
                    dispatch({type: 'AUTHORIZE', payload: 'USER'})
                    dispatch({type: 'SET_USER_EMAIL', payload: email});
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            })
        } else if (isLogin) {
            axios.post('/user/login/', {email, password})
                .then((response) => {
                    console.log('Detail', response.data.detail);
                    if (response.data.detail) {
                        setError(response.data.detail);
                    } else if (!response.data.detail) {
                        setCookie('Email', response.data.email);
                        setCookie('AuthToken', response.data.token);
                        dispatch({type: 'AUTHORIZE', payload: response.data.role})
                        dispatch({type: 'SET_USER_EMAIL', payload: response.data.email})
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Please log in' : 'Please sign up!'}</h2>
                    <input 
                        required
                        type="email" 
                        placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <input 
                    required
                    type="password" 
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    
                    />
                    {!isLogin && 
                    <input 
                        required
                        type="password" 
                        placeholder="confirm password" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />}
                    <input 
                        type="submit" 
                        className="create" 
                        />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth=options">
                    <button onClick={() => viewLogin(false)}>Sign Up</button>
                    <button onClick={() => viewLogin(true)}>Log In</button>
                </div>
            </div>


        </div>
    )
}

export default Auth;