import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/use-auth';

export const Signup = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const onSubmit = async (data) => {
        if (data.password !== data.password_v) {
            setError("Passwords need to be the same!")
            return;
        }

        const response = await auth.signup(
            data.username,
            data.password
        );

        if (response.error) {
            setSuccess(null);
            setError(response.message);
            return;
        }
        setError(null);
        setSuccess(response.data.message);
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
                        <input className="input is-medium" {...register('password', { required: true })} type="password" />
                        {errors.password && <p className="help is-danger">Password is required.</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Verify Password</label>
                    <div className="control">
                        <input className="input is-medium" {...register('password_v', { required: true })} type="password" />
                        {errors.password_v && <p className="help is-danger">Passwords verification is required.</p>}
                    </div>
                </div>

                <input className="input is-medium" type="submit" value="Sign Up"/>

                {success && (
                    <div className="notification is-success is-light">
                        {success}
                    </div>
                )}

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
