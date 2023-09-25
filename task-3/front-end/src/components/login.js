import React, { useState } from 'react';
import { Redirect, Link, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';
import { Signup } from './signup';

export const Login = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");
    const onSubmit = async (data) => {
        const response = await auth.signin(data.username, data.password);

        if (response.error) {
            setError(response.message);
            return;
        }
        setError(null);
        console.log(response);
        return <Redirect to="/home" />;
    }

    return (
        <div className="columns is-half is-centered">
            <div className="box has-background-white-bis">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input is-medium" {...register('username', { required: true })} />
                        {errors.username && <p className="help is-danger">Username is required.</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input is-medium" {...register('password', { required: true })} type="password"/>
                        {errors.password && <p className="help is-danger">Password is required.</p>}
                    </div>
                </div>

                Not registered? <Link to="/signup">Sign up here</Link>
                <input className="input is-medium" type="submit" value="Login" />

                {error && (
                    <div className="notification is-danger is-light">
                        <button className="delete"></button>
                        <strong>ERROR: </strong>
                        {error}
                    </div>
                )}
            </form>
            </div>
        </div>
    );
};

export const Logout = () => {
    const auth = useAuth();
    auth.signout();
    return <Redirect to="/" />;
};
