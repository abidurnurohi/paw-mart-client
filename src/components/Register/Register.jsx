import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, signInWithGoogle } = use(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;

        createUser(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                });

                const newUser = {
                    name,
                    email,
                    image: photo
                };

                fetch('https://paw-mart-api-server-murex.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                navigate('/');
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };

                fetch('https://paw-mart-api-server-murex.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                navigate('/');
            });
    };

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl mt-20">
            <h1 className="text-4xl font-bold pl-8 pt-5">Register</h1>
            <div className="card-body">
                <form onSubmit={handleRegister}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" required />

                        <label className="label">Photo URL</label>
                        <input type="text" name="photo" className="input" required />

                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" required />

                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" required />

                        <button className="btn btn-neutral mt-4 w-full">Register</button>
                    </fieldset>
                </form>

                <button onClick={handleGoogleSignIn} className="btn bg-white text-black border mt-3">
                    Login with Google
                </button>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 font-semibold">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
