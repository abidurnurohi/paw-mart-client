import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';

const Login = () => {
    const { signInUser, signInWithGoogle } = use(AuthContext);
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(() => {
                navigate('/');
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                navigate('/');
            });
    };

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl mt-20">
            <h1 className="text-4xl font-bold pl-8 pt-5">Login</h1>
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" required />

                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" required />

                        <button className="btn btn-neutral mt-4 w-full">Login</button>
                    </fieldset>
                </form>

                <button onClick={handleGoogleLogin} className="btn bg-white text-black border mt-3">
                    Login with Google
                </button>

                <p className="text-center mt-3">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-green-500 font-semibold">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
